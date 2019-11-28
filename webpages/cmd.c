// A "hello world" page
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define INCR_LEN 10

char *getValue(char *, char **);// get the param value
char **getParameters(char *, char **);// get the array of params and values
int main(void)
{
        char **pQuery;
        char *pParam;
        char *name;
        char *city;
        pParam = getenv("QUERY_STRING");

        char *pStr = malloc(strlen(pParam)+1);
        memcpy(pStr, pParam, strlen(pParam)+1);
        pQuery = getParameters(pStr, pQuery);
        name = getValue("cmd_tag", pQuery);
        city = getValue("get_set_type", pQuery); //这句有问题
	
	if(name!=NULL)
	
	{
	if(strstr(name, "reboot"))
	{
	printf("Content-Type:text/html\n\n");// print html
	system("reboot");
//	printf("&answer=3;&access=0;&session_id=DJINR7W014Rs9TAp4L1J3CK4hm98w6D68oT2pw8;");
//	printf("\n\n");
//	printf("this is city   %s\n",city);
	}
#if 0
	if(strstr(name, "getDevTime"))
	{
	printf("Content-Type:text/html\n\n");// print html
	printf("&year=2019;&month=7;&day=14;&hour=20;&minute=21;&second=36;");
	}  

	if(strstr(name, "getDevTime"))
	{
	printf("Content-Type:text/html\n\n");// print html
	printf("&year=2019;&month=7;&day=14;&hour=20;&minute=21;&second=36;");
	} 
	if(strstr(name, "logonStatus"))
	{
	printf("Content-Type:text/html\n\n");// print html
	printf("&answer=14;");
	} 

#endif
	}
 #if 0
	     if(city!=NULL)      //city=null 不处理会报错
	{
          	if(strstr(city, "get"))
	{
	printf("var NETWORK_TYPE=null\n");
	printf("var DHCP_EN=0\n");
	printf("var STATIC_IP=\"192.168.100.10\"\n");
//	printf("var ip=\"192.168.100.10\"\n");
	printf("var NETMASK=\"255.255.255.0\"\n");

	printf("var GATEWAY=\"192.168.100.1\"\n");
	printf("var DNS1=\"192.168.100.1\"\n");
//	printf("var dns1=\"192.168.100.1\"\n");

	printf("var DNS2=\"114.114.114.114\"\n");
	}
	}
         
#endif


#if 0
        puts("<html>");
        puts("<head><title>CGI testing</title></head>");
        puts("<body><br>");
        puts("<p><h2>Hello world!</h2></p>");
        printf("<p>pParam is :%s</p>\n", pParam);
//	printf("<p>*pQuery is :%s</p>\n", *pQuery);
//	printf("<p>**pQuery is :%s</p>\n", **pQuery);
	printf("<p>Your name is :%s</p>\n", name);
        printf("<p>Your city is :%s</p>\n", city);
        puts("</body>");
        puts("</html>");

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