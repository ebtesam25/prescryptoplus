#include <M5Stack.h>
#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include <WiFi.h>
#include <HTTPClient.h>

MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

float hrArray[1000];
float spo2Array[1000];
float tempArray[1000];
int arrayCounter =0;
float avgHR;
float avgSpo2;
float avgTemp;
long lastTime;

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
uint16_t irBuffer[100]; //infrared LED sensor data
uint16_t redBuffer[100];  //red LED sensor data
#else
uint32_t irBuffer[100]; //infrared LED sensor data
uint32_t redBuffer[100];  //red LED sensor data
#endif

int32_t bufferLength; //data length
int32_t spo2; //SPO2 value
int8_t validSPO2; //indicator to show if the SPO2 calculation is valid
int32_t heartRate; //heart rate value
int8_t validHeartRate; //indicator to show if the heart rate calculation is valid

#define WIFI_SSID "OnePlus 6"       // Enter your SSID here
#define WIFI_PASS "tantanatan"    // Enter your WiFi password here
#define serverName "http://899c05555588.ngrok.io/putdata"
WiFiClient client;

void setup()
{
  Serial.begin(115200); // initialize serial communication at 115200 bits per second:

  WiFi.begin(WIFI_SSID, WIFI_PASS); 
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  } 
  Serial.println("Connected to the WiFi network");
  Serial.println(WiFi.localIP());

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1);
  }

  Serial.println(F("Intiating Sensors"));
  delay(1000);

  byte ledBrightness = 155; //Options: 0=Off to 255=50mA
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; //Options: 69, 118, 215, 411
  int adcRange = 4096; //Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings

  M5.begin();
  dacWrite (25,0);
  M5.Lcd.clear();
  baseDisp();

  lastTime = millis();
}

void loop()
{
  bufferLength = 100; //buffer length of 100 stores 4 seconds of samples running at 25sps
  baseDisp();
  
  //read the first 100 samples, and determine the signal range
  for (byte i = 0 ; i < bufferLength ; i++)
  {
    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample

    Serial.print(F("red="));
    Serial.print(redBuffer[i], DEC);
    Serial.print(F(", ir="));
    Serial.println(irBuffer[i], DEC);
  }

  //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  //Continuously taking samples from MAX30102.  Heart rate and SpO2 are calculated every 1 second
  
  while (1)
  {
    
    //dumping the first 25 sets of samples in the memory and shift the last 75 sets of samples to the top
    for (byte i = 25; i < 100; i++)
    {
      redBuffer[i - 25] = redBuffer[i];
      irBuffer[i - 25] = irBuffer[i];
    }

    
    for (byte i = 75; i < 100; i++)
    {
      M5.update();
      while (particleSensor.available() == false) //do we have new data?
        particleSensor.check(); //Check the sensor for new data


      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample(); //We're finished with this sample so move to next sample
      float temperature = particleSensor.readTemperature();

      if (validHeartRate != 0 && validSPO2 !=0 && irBuffer[i] > 50000) {
        float heartRateF = heartRate;
        float spo2F = spo2;

        M5.Lcd.setCursor(5, 60);
        M5.Lcd.printf("                                            ");
        M5.Lcd.setCursor(5, 60);
        M5.Lcd.print("Analysing Data, Please Wait");  
        
        Serial.print(F(", HR="));
        Serial.print(heartRateF);
  
        Serial.print(F(", SPO2="));
        Serial.print(spo2F);
  
        Serial.print(F(", Temp"));
        Serial.println(temperature);

        hrArray[arrayCounter]=heartRateF ;
        spo2Array[arrayCounter]=spo2F;
        tempArray[arrayCounter]=temperature;
        arrayCounter = arrayCounter +1;
        
      }else if(irBuffer[i] < 50000){
          Serial.println("No Finger Detected");
          M5.Lcd.setCursor(5, 60);
          M5.Lcd.printf("                                            ");
          M5.Lcd.setCursor(5, 60);
          M5.Lcd.print("No Finger Detected");
          
          
      }else{
          Serial.println("Sensor Error, readjust your finger");        
          M5.Lcd.setCursor(5, 60);
          M5.Lcd.print("                                            ");
          M5.Lcd.setCursor(5, 60);
          M5.Lcd.print("Sensor Error, readjust your finger");
           
       }
      Serial.println(arrayCounter);

       if (millis() - lastTime >10000 && arrayCounter>50 ){
          M5.Lcd.setCursor(30, 220,2);
          M5.Lcd.print("Send Data");
          M5.Lcd.setCursor(140, 220,2);
          M5.Lcd.print("Avg Data");
          M5.Lcd.setCursor(5, 80);
          M5.Lcd.print("New Avg Value Generated");
          M5.Lcd.setCursor(5, 100);
          M5.Lcd.print("Press Button B");
          
          Serial.print("Average Values: ");
          
          float sumHR=0;
          float sumSpo2=0;
          float sumTemp=0;
  
          for(int x = 0; x<arrayCounter; x++){
              sumHR +=hrArray[x];      
              sumSpo2 +=spo2Array[x];            
              sumTemp +=tempArray[x];
            }
          avgHR = sumHR/arrayCounter;
          avgSpo2 = sumSpo2/arrayCounter;
          avgTemp = sumTemp/arrayCounter;
          Serial.print(avgHR);
          Serial.print(" | ");
          Serial.print(avgSpo2);
          Serial.print(" | ");
          Serial.println(avgTemp);
          lastTime = millis();
          arrayCounter=0;
          if (avgHR > 120){
              avgHR = 120;
            }
        }
      if (M5.BtnA.wasReleased()){
          sendData(avgHR,avgSpo2, avgTemp);
          Serial.println("Button A was pressed");
        }
      if (M5.BtnB.wasReleased()){
          M5.Lcd.setTextColor(GREEN);
          M5.Lcd.setCursor(0, 120);
          M5.Lcd.printf("Showing Average data");
          M5.Lcd.setCursor(0, 140);
          M5.Lcd.printf("Avg Heart Rate : %2.1f", avgHR);
          M5.Lcd.setCursor(0, 160);
          M5.Lcd.printf("Avg Blood Oxygen Level : %4.0f ", avgSpo2);
          M5.Lcd.setCursor(0, 180);
          M5.Lcd.printf("Avg Body Temperature : %4.0f ", avgTemp);
          M5.Lcd.setTextColor(WHITE);
          M5.update();
        }
      if (M5.BtnC.wasReleased()){
          M5.Lcd.clear();
          baseDisp();
        }
    }

    //After gathering 25 new samples recalculate HR and SP02
    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
       
  }
}

void baseDisp(){
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setTextSize(2);
  M5.Lcd.setCursor(20, 4);
  M5.Lcd.println("PresCryptoChainPlus");
  M5.Lcd.setTextSize(1);
  M5.Lcd.setCursor(230, 220,2);
  M5.Lcd.printf("Clear Screen");
  M5.update();
  
  }

void sendData(float hrVal, float spo2Val, float tempVal){
    char httpRequestData[200];
     if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      sprintf(httpRequestData, "HR=%4f&spo2=%4f&temp=%4f&USERID=001&patient=5ec04ed9f80f9328703088b1&doctor=5ec04ec9f80f9328703088b0",hrVal,spo2Val,tempVal);
      //sprintf(httpRequestData, "temperature=24&steps=5");
      int httpResponseCode = http.POST(httpRequestData);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
    }
  }
