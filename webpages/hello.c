// A "hello world" page
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define INCR_LEN 10
#include <sys/un.h>
#include <sys/socket.h>
#include <fcntl.h>

char *getValue(char *, char **);// get the param value
char **getParameters(char *, char **);// get the array of params and values
int main(void)
{
        char **pQuery;
        char *pParam;
        char *name;
        char *city;
        pParam = getenv("QUERY_STRING");
	printf("this is pParem");
        char *pStr = malloc(strlen(pParam)+1);
        memcpy(pStr, pParam, strlen(pParam)+1);
        pQuery = getParameters(pStr, pQuery);
        name = getValue("name", pQuery);
        city = getValue("city", pQuery);

        printf("Content-Type:text/html\n\n");// print html
        puts("<html>");
        puts("<head><title>An HTML Page From a CGI</title></head>");
        puts("<body><br>");
        puts("<p><h2>Hello world!</h2></p>");
        printf("<p>Your name is :%s</p>\n", pParam);
        printf("<p>Your city is :%s</p>\n", city);
        puts("</body>");
        puts("</html>");

	int i;
	i=1;
	int cfd=socket(AF_LOCAL, SOCK_STREAM, 0);
	struct sockaddr_un cli_addr;
	cli_addr.sun_family=AF_LOCAL;
	strcpy(cli_addr.sun_path, "/tmp/client.socket");
	bind(cfd, (struct sockaddr *)&cli_addr, sizeof(cli_addr));
	struct sockaddr_un ser_addr;
	ser_addr.sun_family=AF_LOCAL;
	strcpy(ser_addr.sun_path, "/tmp/server.socket");
	int flags = 0;
      	//获取文件的flags
      	fcntl(cfd, F_GETFL, &flags);
      	//增加文件的某个flags，比如文件是阻塞的，想设置成非阻塞:
      	fcntl(cfd, F_SETFL, O_NONBLOCK | flags);
	i=connect(cfd, (struct sockaddr *)&ser_addr, sizeof(ser_addr));
	if(i==-1)
	{
	printf("connect fail \n");
	}
	else
	{
	printf("connect succ \n");
	}
	i=5;
	while (1)
	{

		char buf[256];		
		//fgets(buf, sizeof(buf), stdin);
		strcpy(buf,"this is hello.cgi");
		printf("testing 1\n");
#if 1
		i=write(cfd, buf, strlen(buf));
		if(i==-1)
		{
		printf("write fail \n");
		}
		else if(i==0)
		{
		printf("write succ \n");
		}
		else
		{		
		printf("write succ2 \n");
		}


		i=read(cfd, buf, sizeof(buf));
		if(i==-1)
		{
		printf("read fail \n");
		}
		else if(i==0)
		{
		printf("read succ \n");
		}
		else
		{
		i--;
		printf("buf is %s  and i %d\n",buf,i);
		//cout<<buf<<endl;
		break;
		}
		sleep(1);
#endif
	}

	printf("end of the program\n");
	close(cfd);
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