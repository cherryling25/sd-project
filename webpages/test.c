#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include<time.h>

#include  <arpa/inet.h>

#include <sys/socket.h>
#include <netinet/in.h>
#include<errno.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <net/if.h>
#include <netdb.h>
#include <string.h>


void DispNetInfo(const char* szDevName)
{



     	int s = socket(AF_INET, SOCK_DGRAM, 0);
     	if (s < 0)
    	 {
        	 fprintf(stderr, "Create socket failed!errno=%d", errno);
       	  return;
    	 }
    	struct ifreq ifr;
     	unsigned char mac[6];
     	unsigned long nIP, nNetmask, nBroadIP; 
     	printf("%s:\n", szDevName); 
     	strcpy(ifr.ifr_name, szDevName);
     	if (ioctl(s, SIOCGIFHWADDR, &ifr) < 0)
    	 {
        	 return;
     	}
     	memcpy(mac, ifr.ifr_hwaddr.sa_data, sizeof(mac));
     	printf("\tMAC: %02x-%02x-%02x-%02x-%02x-%02x\n",
                mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]); 


     	strcpy(ifr.ifr_name, szDevName);
     	if (ioctl(s, SIOCGIFADDR, &ifr) < 0)
    	 {
        	nIP = 0;
     	}
     	else
     	{
         	nIP = *(unsigned long*)&ifr.ifr_broadaddr.sa_data[2];
     	}
     	printf("\tIP: %s\n", inet_ntoa(*(struct in_addr*)&nIP));
	//printf("\tIP: %s\n", nIP);
 
     	strcpy(ifr.ifr_name, szDevName);
     	if (ioctl(s, SIOCGIFBRDADDR, &ifr) < 0)
     	{
         	nBroadIP = 0;
     	}
     	else
     	{
        	 nBroadIP = *(unsigned long*)&ifr.ifr_broadaddr.sa_data[2];
     	}
     	printf("\tBroadIP: %s\n", inet_ntoa(*(struct in_addr*)&nBroadIP));
 
    	 strcpy(ifr.ifr_name, szDevName);
     	if (ioctl(s, SIOCGIFNETMASK, &ifr) < 0)
     	{
        	 nNetmask = 0;
     	}
    	 else
    	 {
       	  nNetmask = *(unsigned long*)&ifr.ifr_netmask.sa_data[2];
  	   }
  	   printf("\tNetmask: %s\n", inet_ntoa(*(struct in_addr*)&nNetmask));
   	  close(s);
}


int main(void)
{

	FILE *fp;
	char buf[512];
	char cmd[128];
	char gateway[30];
	char *tmp;

	const char* EthDevName  =  "eth0" ;       //   £¨Íø¿¨Ãû³Æ£©

	DispNetInfo( EthDevName);

	strcpy(cmd, "ip route");
	fp=popen(cmd,"r");
	if(NULL==fp)
	{
	printf("var GATEWAY=\"192.168.100.192\"\n");
	}
	
	
	while(fgets(buf,sizeof(buf),fp)!=NULL)
	{
	//	printf("var GATEWAY=\"%s\";\n",buf);
		tmp=buf;
		while(*tmp && isspace(*tmp))
		++tmp;

	//	printf("var GATEWAY=\"%s\";\n",tmp);

		if(strncmp(tmp,"default",strlen("default"))==0)
		if(strncmp(tmp,"default",strlen("default"))==0)
		
		break;
		
	}
	//printf("var GATEWAY=\"%s\";\n",buf);
	sscanf(buf,"%*s%*s%s",gateway);	
	printf("var GATEWAY=\"%s\";\n",gateway);
	pclose(fp);



	
	fp=fopen("/etc/resolv.conf","r");
	if(NULL==fp)
	{
	printf("var DNS=\"114.114.114.114\"\n");
	}
	
	
	while(fgets(buf,sizeof(buf),fp)!=NULL)
	{
		printf("var DNS=\"%s\";\n",buf);
		tmp=buf;
		while(*tmp && isspace(*tmp))
		++tmp;

	//	printf("var GATEWAY=\"%s\";\n",tmp);

		if(strncmp(tmp,"nameserver",strlen("nameserver"))==0)		
		
		break;
		
	}
	printf("var DNS=\"%s\";\n",buf);
	sscanf(buf,"%*s%s",gateway);	
	printf("var DNS=\"%s\";\n",gateway);
	pclose(fp);


}

