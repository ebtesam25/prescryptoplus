#include <WiFi.h>
#include <HTTPClient.h>
#include <M5StickC.h>
#include <Wire.h>

#define GSR 33
int sensorValue=0;
float gsr_average=0;

float accX = 0;
float accY = 0;
float accZ = 0;
float temp = 0;
float acclX[100] ={0};
float acclY[100] ={0};
float acclZ[100] ={0};
float totalVector[100];
float totalAvg[100];
float avgX,avgY,avgZ;
float steps;

int Threshold = 550;
const int ledPin = 26;

int stepFlag = 0;
float threshold=1.5;

unsigned long lastTime=0;


#define WIFI_SSID "OnePlus 6"       // Enter your SSID here
#define WIFI_PASS "tantanatan"    // Enter your WiFi password here
#define serverName "http://899c05555588.ngrok.io/putdata2"
WiFiClient client;

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASS); 
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  } 
  Serial.println("Connected to the WiFi network");
  Serial.println(WiFi.localIP());
  
  M5.begin();
  M5.Lcd.setRotation(1);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setTextSize(1);
  M5.Lcd.setCursor(20, 10);
  M5.Lcd.println("PresCryptoChainPlus");
  M5.Lcd.setTextSize(1);
  M5.MPU6886.Init();
  stepsCalibrate();
  lastTime = millis();
  pinMode (ledPin, OUTPUT);
}

void loop() {

  for(int i=0;i<100;i++){
      long sum=0;
      for(int i=0;i<10;i++)           //Average the 10 measurements to remove the glitch
          {
          sensorValue=analogRead(GSR);
          sensorValue = map(sensorValue, 0, 4095, 0, 255);
          sum += sensorValue;
          delay(5);
          }
      gsr_average = sum/10;
      M5.MPU6886.getAccelData(&accX,&accY,&accZ);
      
      acclX[i] = accX;
      acclY[i] = accY;
      acclZ[i] = accZ;
      totalVector[i] = sqrt(((acclX[i]-avgX)*(acclX[i]-avgX))+((acclY[i]-avgY)*(acclY[i]-avgY))+((acclZ[i]-avgZ)*(acclZ[i]-avgZ)));
      totalAvg[i] = ( totalVector[i] + totalVector[i-1] )/2;
      
      Serial.print(totalAvg[i]);
      Serial.print(" | ");
      Serial.println(gsr_average);
      
      if (totalAvg[i] > threshold && stepFlag == 0) {
          steps = steps+1;
          stepFlag = 1;
        }
  
      if (totalAvg[i] < threshold && stepFlag == 1) {
          stepFlag = 0;
          }
      M5.MPU6886.getTempData(&temp);
  
      M5.Lcd.setCursor(5, 24, 2);
      M5.Lcd.printf("Steps Taken : %2.1f", steps);
      M5.Lcd.setCursor(5, 44, 2);
      M5.Lcd.printf("Average GSR : %4.0f ", gsr_average);

      if(millis() - lastTime > 10000){
          //sendData(gsr_average,steps);
        }
      
      if(digitalRead(M5_BUTTON_HOME) == LOW){
          M5.Lcd.fillScreen(GREEN);
          M5.Lcd.setCursor(0, 20);
          M5.Lcd.println("UV LED Activate");
          M5.Lcd.setCursor(0, 40);
          M5.Lcd.print("Turning off led in 5 sec");
          
          digitalWrite (ledPin, HIGH);
          delay(5000);
          sendData(gsr_average,steps);
          M5.Lcd.fillScreen(BLACK);
          
            M5.Lcd.setTextSize(1);
            M5.Lcd.setCursor(20, 10);
            M5.Lcd.println("PresCryptoChainPlus");
          digitalWrite (ledPin, LOW);
        }
      delay(100); 
  } 
}

//-------------------------------------------------------------------------SendData---------------------------------------------------------------------------------//

void sendData(float GSRVal, float steps){
    char httpRequestData[200];
     if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      sprintf(httpRequestData, "GSR=%4f&steps=%4f&USERID=001&patient=5ec04ed9f80f9328703088b1&doctor=5ec04ec9f80f9328703088b0",GSRVal,steps);
      //sprintf(httpRequestData, "temperature=24&steps=5");
      int httpResponseCode = http.POST(httpRequestData);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
    }
  }
//-------------------------------------------------------------------------StepsCalibrate---------------------------------------------------------------------------------//
void stepsCalibrate()
{
  Serial.println("Calibrating Steps");
  float sumX=0;
  float sumY=0;
  float sumZ=0;
  float valX[100] ={0};
  float valY[100] ={0};
  float valZ[100] ={0};
  for (int i=0;i<100;i++){
    M5.MPU6886.getAccelData(&accX,&accY,&accZ);
    valX[i]=accX;
    valY[i]=accY;
    valZ[i]=accZ;
    sumX=valX[i]+sumX;
    sumY=valY[i]+sumY;
    sumZ=valZ[i]+sumZ;
    }

  avgX=sumX/100.0;
  avgY=sumY/100.0;
  avgZ=sumZ/100.0;

  Serial.print("Steps Calibration Complete  : ");
  Serial.print(avgX);
  Serial.print(" | ");
  Serial.print(avgY);
  Serial.print(" | ");
  Serial.println(avgZ);

}
