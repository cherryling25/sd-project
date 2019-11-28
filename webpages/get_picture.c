
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
	int ret = -1;
	flags= 0;
	i=1;
	int n=0;

	cli_fd=socket(AF_LOCAL, SOCK_STREAM, 0);

	struct sockaddr_un ser_addr;
	ser_addr.sun_family=AF_LOCAL;
	strcpy(ser_addr.sun_path, "/tmp/server.socket");      	

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

	char buf[30000]="get_picture.cgi ";	//保持最够大的BUFFER	
		

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
			n=50;
			while (1)
			{
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
		
					int  fd,n;	
					fd=open("/mnt/web/webpages/video/infrared.jpg",O_CREAT|O_RDWR );
				//	fd=fopen("/mnt/web/webpages/video/infrared.jpg","w" );
					if(fd<0)
						{
						printf(" open file 1234.jpg fail\n");
						}
					else
						{
						n=write(fd,buf,i);			
						printf("writeback %d ",n);		
					//	sprintf(buf,"writeback %d ",n);
					//	i=write(cli_fd, buf, strlen(buf));
						usleep(200);
						close(fd);
					//	unlink("/mnt/web/webpages/video/infrared.jpg");
						}
					break;
				}
				n--;
				if(n<0)
				{
				break;
				}
			//	sleep(1);
			close(cli_fd);
			} 
			}	

}