// A "hello world" page
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include<time.h>
#define INCR_LEN 10
#include <sys/un.h>
#include <sys/socket.h>
#include <fcntl.h>

char *getValue(char *, char **);// get the param value
char **getParameters(char *, char **);// get the array of params and values

#if 0
int sendbuffer(char *buff)
{

	int i,flags,cli_fd;	
	flags= 0;
	i=1;
	cli_fd=socket(AF_LOCAL, SOCK_STREAM, 0);
//	struct sockaddr_un cli_addr;
//	cli_addr.sun_family=AF_LOCAL;
//	strcpy(cli_addr.sun_path, "/tmp/client.socket");
//	bind(cli_fd, (struct sockaddr *)&cli_addr, sizeof(cli_addr));
	struct sockaddr_un ser_addr;
	ser_addr.sun_family=AF_LOCAL;
	strcpy(ser_addr.sun_path, "/tmp/server.socket");      	
//      	fcntl(cli_fd, F_GETFL, &flags);		//获取文件的flags      	
//     	fcntl(cli_fd, F_SETFL, O_NONBLOCK | flags);	//增加文件的某个flags，比如文件是阻塞的，想设置成非阻塞:
	i=connect(cli_fd, (struct sockaddr *)&ser_addr, sizeof(ser_addr));
	if(i==-1)
		{
	//	printf("connect fail<br> \n");
		}
	else
		{
	//	printf("connect succ \n");
		}
	
	while (1)
		{
		//char buf[9192]="get_param.cgi ";	//保持最够大的BUFFER	
		
#if 1
		i=write(cli_fd, buf, strlen(buf));
		if(i==-1)
			{
		//	printf("write fail<br> \n");
			}
		else if(i==0)
			{
		//	printf("write succ <br>\n");
			}
		else
			{		
		//	printf("write succ2<br> \n");
			}

		i=read(cli_fd, buf, sizeof(buf));
		if(i==-1)
			{
		//	printf("read fail<br> \n");
			}
		else if(i==0)
			{
		//	printf("read succ<br> \n");
			}
		else
			{
			i--;
			printf("%s ",buf);		
			break;
		}
		sleep(1);
#endif
	} 

}

#endif
int main(void)
{
        	char **pQuery;
        	char *pParam;
       	char *name;
        	char *city;
	//char * setdate;
        	pParam = getenv("QUERY_STRING");	//调用的库函数

//	printf("pParam is %s<br>\n",pParam);

	time_t timep;
	struct tm *p;
	time (&timep);
	
        	char *pStr = malloc(strlen(pParam)+1);
        	memcpy(pStr, pParam, strlen(pParam)+1);	//pParam复制到*pStr


//	printf("pStr is %s<br>\n",pStr);

#if 0	
        	pQuery = getParameters(pStr, pQuery);
//	printf("pQuery is %s<br>\n",*pQuery);		//显示不出来内容
        	name = getValue("set_cmd", pQuery);
//	printf("name is %s<br>\n",name);
//	printf("pStr2 is %s<br>\n",pStr);
#endif	
	
#if 1
	int i,flags,cli_fd;	
	flags= 0;
	i=1;
	cli_fd=socket(AF_LOCAL, SOCK_STREAM, 0);
	struct sockaddr_un cli_addr;
	cli_addr.sun_family=AF_LOCAL;
	strcpy(cli_addr.sun_path, "/tmp/set.param");
	unlink("/tmp/set.param");
	bind(cli_fd, (struct sockaddr *)&cli_addr, sizeof(cli_addr));
	struct sockaddr_un ser_addr;
	ser_addr.sun_family=AF_LOCAL;
	strcpy(ser_addr.sun_path, "/tmp/server.socket");      	
      	fcntl(cli_fd, F_GETFL, &flags);		//获取文件的flags      	
      	fcntl(cli_fd, F_SETFL, O_NONBLOCK | flags);	//增加文件的某个flags，比如文件是阻塞的，想设置成非阻塞:
	i=connect(cli_fd, (struct sockaddr *)&ser_addr, sizeof(ser_addr));
	if(i==-1)
		{
	//	printf("connect fail<br> \n");
		}
	else
		{
	//	printf("connect succ \n");
		}
	
	//	i=write(cli_fd, pStr, strlen(pStr));

		char buf[9192]=" ";	//保持最够大的BUFFER
		strcpy(buf,pStr);
		i=write(cli_fd, buf, strlen(buf));
		if(i==-1)
			{
		//	printf("write fail<br> \n");
			}
		else if(i==0)
			{
		//	printf("write succ <br>\n");
			}
		else
			{		
		//	printf("write succ2<br> \n");
			}

	
	while (1)
		{	
		
#if 1
		

		i=read(cli_fd, buf, sizeof(buf));
		if(i==-1)
			{
		//	printf("read fail<br> \n");
			}
		else if(i==0)
			{
		//	printf("read succ<br> \n");
			}
		else
			{
			i--;
			printf("%s ",buf);		
			break;
		}
		usleep(1000);
#endif
	} 

#endif
        //	close(cli_fd);

#if 0	
	if(name!=NULL)		//对set_param.cgi的set_cmd给出的命令进行处理
	
 	{
		if(strstr(name, "loading"))	//加载命令
		{
		printf("Content-Type:text/html\n\n");// print html
		printf("&answer=3;&access=0;&session_id=DJINR7W014Rs9TAp4L1J3CK4hm98w6D68oT2pw8;");

		}
	
		if(strstr(name, "setManualDate"))	//手动设置日期
		{ 
         		char setdate[20];      
		printf("Content-Type:text/html\n\n");// print html
		//printf("date -s %s%s%s0000",getValue("webtime_year", pQuery),getValue("webtime_mon", pQuery),getValue("webtime_day", pQuery));

		sprintf(setdate,"date -s %s%s%s0000",getValue("webtime_year", pQuery),getValue("webtime_mon", pQuery),getValue("webtime_day", pQuery));	
		system(setdate);
		//printf("setdate is %s",setdate);
		printf("&ret=1;");
		}  
	

		if(strstr(name, "setManualTime"))	//手动设置时间
		{ 
 		char setdate[20];        
		printf("Content-Type:text/html\n\n");// print html
		sprintf(setdate,"date -s %s:%s:%s",getValue("webtime_hour", pQuery),getValue("webtime_min", pQuery),getValue("webtime_sec", pQuery));
		//printf("setdate is %s",setdate);	
		system(setdate);
		printf("&ret=1;");
		}  

		if(strstr(name, "setAutoTiming"))	//自动设置时间
		{       
		printf("Content-Type:text/html\n\n");// print html
		printf("&ret=1;");
		} 

		if(strstr(name, "getAllTempCoor"))
		{       
		printf("Content-Type:text/html\n\n");// print html
		printf("&answer=14;&boxFlag=63;&spotFlag=63;&lineFlag=1;&mouseFlag=0;&a_max=343;&a_min=333;&a_aver=525;&b_max0=343;&b_min0=343;&b_aver0=343;&bred_x0=96;&bred_y0=72;&bblue_x0=96;&bblue_y0=72;&b_alarm0=0;&b_max1=343;&b_min1=343;&b_aver1=343;&bred_x1=264;&bred_y1=72;&bblue_x1=264;&bblue_y1=72;&b_alarm1=0;&b_max2=343;&b_min2=338;&b_aver2=342;&bred_x2=48;&bred_y2=168;&bblue_x2=36;&bblue_y2=214;&b_alarm2=0;&b_max3=343;&b_min3=343;&b_aver3=343;&bred_x3=192;&bred_y3=192;&bblue_x3=192;&bblue_y3=192;&b_alarm3=0;&b_max4=343;&b_min4=338;&b_aver4=341;&bred_x4=336;&bred_y4=192;&bblue_x4=404;&bblue_y4=192;&b_alarm4=0;&b_max5=343;&b_min5=338;&b_aver5=339;&bred_x5=70;&bred_y5=264;&bblue_x5=48;&bblue_y5=264;&b_alarm5=0;&s_aver0=343;&s_alarm0=0;&s_aver1=343;&s_alarm1=0;&s_aver2=343;&s_alarm2=0;&s_aver3=343;&s_alarm3=0;&s_aver4=343;&s_alarm4=0;&s_aver5=343;&s_alarm5=0;&l_max0=338;&l_min0=338;&l_aver0=338;&lred_x0=306;&lred_y0=322;&lblue_x0=306;&lblue_y0=322;&l_alarm0=0;");
		}  

		if(strstr(name, "getDevTime"))		//获取设备时间
		{
        		p=gmtime(&timep);
		printf("Content-Type:text/html\n\n");// print html
		printf("&year=%d;&month=%d;&day=%d;&hour=%d;&minute=%d;&second=%d;",1900+p->tm_year,1+p->tm_mon,p->tm_mday,p->tm_hour,p->tm_min,p->tm_sec);
		} 
    	}
#endif
        return 0;
}

char **getParameters(char *pTemp, char **pQuery)
{
        char **pArrayTemp = NULL;
        pQuery = calloc(INCR_LEN, sizeof(char *));
        char *pParamIndex = NULL;
        int i = 0;
        int count_max = INCR_LEN;

        while((pParamIndex = strchr(pTemp,'&')) != NULL)
        {
                if(i == count_max) // array reach max(10) need more memory
                {
                        count_max += INCR_LEN;
                        pArrayTemp = realloc(pQuery, count_max*sizeof(char*));
                        if(!pArrayTemp)
                        {
                                exit(1);
                        }
                        pQuery = pArrayTemp;
                }

                *(pQuery+i) = malloc(pParamIndex - pTemp + 1);
                strncpy(*(pQuery+i), pTemp, pParamIndex - pTemp);
                strncpy(pTemp, pParamIndex+1, strlen(pTemp) - (pParamIndex-pTemp) + 1);
                i++;
        }
        *(pQuery+i) = malloc(strlen(pTemp) + 1);
        strncpy(*(pQuery+i), pTemp, strlen(pTemp)+1);
        return pQuery;
}

char *getValue(char *pParameter, char **pParamValues)
{
        char *pValue = NULL;
        for(; *pParamValues!=NULL; pParamValues++)
        {
                if(strstr(*pParamValues, pParameter))
                {
                        pValue = strchr(*pParamValues, '=');
                        if(pValue)
                        return pValue+1;
                }
        }

        return NULL;
}