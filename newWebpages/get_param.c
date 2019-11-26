// A "hello world" page
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define INCR_LEN 10
#include <sys/un.h>
#include <sys/socket.h>
#include <fcntl.h>

int main(void)
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
//      	fcntl(cli_fd, F_SETFL, O_NONBLOCK | flags);	//增加文件的某个flags，比如文件是阻塞的，想设置成非阻塞:
	i=connect(cli_fd, (struct sockaddr *)&ser_addr, sizeof(ser_addr));
	if(i==-1)
		{
	//	printf("connect fail<br> \n");
		}
	else
		{
	//	printf("connect succ \n");
		}
#if 0
	fd_set rset;
	int maxfd;
	struct timeval tout;
	char buf[BUFSIZ+1024];
	int ret = -1;
#endif	
	while (1)
		{
		char buf[9192]="get_param.cgi ";	//保持最够大的BUFFER	
		
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
//	close(cli_fd);
#endif
	} 

}