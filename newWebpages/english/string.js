var _valid_ip = 'not valid ip';
var _valid_ip1 = 'not valid mask';
var _valid_ip2 = 'not valid gateway';
var _valid_ip3 = 'not valid DNS1';
var _valid_ip4 = 'not valid DNS2';
var _user_111 = "Visitor";
var _user_222 = "Operator";
var _user_333 = "Administrator";
var _ptz_speed_1 = "Slow";
var _ptz_speed_2 = "Med";
var _ptz_speed_3 = "Fast";
var _user_x1 = "The administrator account is empty";
var _user_x2 = "User name can not be the same";
var _log_send = "send";
var _log_clr = "clear";
var _wps = "WPS";
var _wps_1 = "disable";
var _wps_status = "WPS Status";
var _wps_msg0 = "no action";
var _wps_msg1 = "wps failed";
var _wps_msg2 = "wps ok";
var _wps_msg3 = "wps overlap detection";
var _wps_msg4 = "wps prcess";
var _wps_msg5 = "undefine wps status";
var _wifi_mode_x = "Wireless p2p mode";
var _wifi_mode_x_1 = "Switch to wireless p2p mode?";
var _wifi_mode_x_2 = "Wireless mode";
var _recpath_sel="select...";
var _not_null="The content can not be empty";
var _port_range="Port range (81~65535)";
var _ftp_upimg_time="Empty or 0 means do not upload pictures";
var _ftp_upimg_stretch='0 means do not upload pictures(30-3600)';
var _mail_reviver_null="At least one receiver";
var _stream='stream:';
var _media_main_1="Main-stream";
var _media_sub_1="Sub-stream";
var _media_thr='Thr-stream';
var _fac_dns="Camera domain";
var _pt_run_always = "Always";
var _sun='Sun';
var _mon='Mon';
var _tue='Tue';
var _wed='Wed';
var _thu='Thu';
var _fri='Fri';
var _sat='Sat';
var _day='days';
var _schedule='Scheduler';
var _rebootinfo='The camera is rebooting. Don\'t shutdown it\'s power. Please waiting ...';
var _reupgradeinfo='The equipment is upgrading ...';
var _refreshcameraparams='refresh camera params';
var _refreshvideo='refresh video';
var _alarmstatus='Alarm Status';
var _motion_alarm='Motion Detect Alarm';
var _input_alarm='Input Alarm';
var _livevideo='Live Video';
var _devicemanagement='Camera Management';
var _ie_protected_mode_info='Record function can not work because IE Protected Mode is on. You can add this site to the list of Trusted sites (IE Tools menu > Internet Options > Security tab > Trusted sites)';
var _buffer='audio buffer';
var _osd_option='<option>disabled</option><option>black</option><option>yellow</option><option>red</option><option>white</option><option>blue</option>';
var _reversal='reversal';
var _mirror='mirror';
var _anonymous='anonymous';
var _mode_activex='ActiveX Mode (For IE Browser)';
var _mode_serverpush='Server Push Mode (For Safari, FireFox, Google Browser)';
var _mode_quicktime='QuickTime media player Mode (For Safari, FireFox, Chrome)';
var _ipcam_title='Connect to Camera'; 
var _ipcam_user='UserName';
var _ipcam_pwd='Password';
var _ipcam_til='Save Password(R)';
var _ipcam_ok='OK';
var _ipcam_no='Cancel';
var _active_alarm='Active Alarm';
var _alarm_condition='Condition';
var _alarm_capture='Capture';
var _alarm_threshold='Threshold';
var _alarm_hysteresis='Tysteresis';
var _alarm_threshold_time='Threshold Time';
var _alarm_action='Alarm Action';
var _alarm_submit='Please select the temperature zone first!';
var _developer_options='Developer account';
var _operator_options='Operator Options';
var _admin_options='Admin Options';
var _user_options='user';
var _pwd_options='password';
var _authenticate_email='Authenticate e-mail';
var _recipient_address='Recipient Address';
var _user_email='user';
var _pwd_email='Sender Password';
var _sender_address='Sender Address';
var _address='Address';
var _document='Document';
var _user='User';
var _pwd='Password';
var _signin='Sign in';
var _attention='attention:';
var _attention1='case sensitive';
var _attention2='propose using 1024 * 768 screen resolution';
var _devicestatus='Device';
var _4visitor='For Visitor';
var _4operator='For Operator';
var _4administrator='For Administrator';
var _configdevice='Camera Configuration';
var _talk='Talk';
var _audio='audio';
var _video='video';
var _play='play';
var _stop='stop';
var _snapshot='Snapshot';
var _record='Recorde mode';
var _alias='Device Name';
var _switch='switch';
var _switchon='GPIO power on';
var _switchoff='GPIO power off';
var _open='open';
var _close='close';
var _resolution='Resolution:';
var _mode='Mode:';
var _brightness='Brightness:';
var _contrast='Contrast';
var _outdoor='outdoor';
var _default='Default';
var _unselected='unselected';
var _device='Device';
var _err_connect='can\'t connect to the camera';
var _err_socket='socket error';
var _err_timeout='timeout';
var _err_version='incorrect software version';
var _err_cancel='canceled by user';
var _err_closed='disconnected by the camera';
var _err_file='file operation error';
var _err_param='illegal params';
var _err_thread='thread operation error';
var _err_status='illegal status';
var _err_id='incorrect camera id';
var _fail_user='incorrect user';
var _fail_maxconns='have reached the max connection count';
var _fail_version='incorrect software version';
var _fail_id='incorrect camera id';
var _fail_pwd='incorrect password';
var _fail_pri='unauthorized operation';
var _fail_unsupport='the camera don\'t support this function';
var _err_unknown='unknown error';
var _failtoconnect='fail to connect to the camera';
var _failtorecord='fail to record';
var _failtoplayvideo='fail to play video';
var _failtoplayaudio='fail to play audio';
var _failtostarttalk='fail to start talking';
var _save='Save';
var _dev_info='Camera Settings';
var _bstr_info='bitStream Info';
var _temp_measure='tempture measure';
var _FTP_setting='TFTP setting';
var _email_setting='e-mail setting';
var _platform_access='platform access';
var _post_url='post url';
var _alias_config='Alias Settings';
var _goback='Back';
var _datetime_config='Date&Time Settings';
var _users_config='Users Settings';
var _multidevice_config='Multi-Camera Settings';
var _network_config='Ethernet Settings';
var _network_status='Network status';
var _dns_config='Basic Dns Settings';
var _wireless_config='WiFi Settings';
var _adsl_config='PPPoE Settings';
var _upnp_config='UPnP Settings';
var _ddns_config='DDNS Settings';
var _mail_config='Mail Settings';
var _ftp_config='FTP Settings';
var _alarm_config='Alarm Settings';
var _upgrade_firmware='Upgrade Camera Firmware';
var _restore_factory='Restore';
var _reboot='Reboot';
var _dev_id='Device ID';
var _sw_ver='Software Version';
var _aw_ver='Web UI Version';
var _set='Submit';
var _upgrade='Upgrade';
var _failtoset='fail to set parameters';
var _oktoset='succeed in setting parameters';
var _oktoset_reboot='succeed in setting parameters, the camera is rebooting';
var _failtoreboot='fail to reboot camera';
var _oktoreboot='the camera is rebooting';
var _failtorestore='fail to restore factory settings';
var _oktorestore='succeed in restoring factory settings, the camera is rebooting';
var _upgrade_swware='Upgrade System Firmware';
var _upgrade_file='File';
var _failtoupgrade='fail to upgrade';
var _oktoupgrade='Upgrading... Don\'t shutdown the power of the camera before it works again !!!';
var _upgrading_progress='Upgrading Progress';
var _group='Group';
var _pri_list='<option value=1>Visitor</option><option value=2>Operator</option><option value=255>Administrator</option>';
var _visitor='Visitor';
var _operator='Operator';
var _administrator='Administrator';
var _refresh='Refresh';
var _device_clock_time='Clock Time';
var _failtofetch='fail to fetch parameters';
var _device_tz='Clock Timezone';
var _ntp_choice='Sync with NTP Server';
var _ntp_server='Ntp Server';
var _syncwithpc='Sync with PC Time';
var _dhcp_choice='Obtain IP from DHCP Server';
var _dns='dns name';
var _dns_port='dns port';
var _dns_times='dns heart interval';
var _ip='IP Address';
var _local_port='LOCAL PORT';
var _sip_id='SIP SERVER ID';
var _sip_field='SIP SERVER FIELD';
var _sip_address='SIP SERVER ADDRESS';
var _sip_port='SIP SERVER PORT';
var _sip_username='SIP SERVER USERNAME';
var _reg_pwd='SIP SERVER PSW';
var _keepalive_interval='HEARTBEAT CYCLE';
var _register_period='REGISTRATION VALIDITY';
var _heartbeat_fail='HEARTBEAT TIMEOUT';
var _mask='Subnet Mask';
var _gateway='Gateway';
var _dns='DNS Server';
var _dns1='DNS Server 1';
var _dns2='DNS Server';
var _cmdport='Command Port';
var _dataport='Media Port';
var _port='Http Port';
var _rtspurl='RTSP URL';
var _onvif_port='ONVIF Port';
var _onvifurl='ONVIF URL';
var _cmd_port='Command Port';
var _data_port='Data Port';
var _rtsp_port='RTSP Port';
var _adsl_choice='Using PPPoE Dialup';
var _rtsp_config='RTSP Settings';
var _rtsp_choice='Enable RTSP authentication, and using the above username and password as RTSP authentication'
var _rtsp_user='RTSP User';
var _rtsp_pwd='RTSP Password';
var _adsl_user='PPPoE User';
var _adsl_pwd='PPPoE Password';
var _mail_inet_ip='Report Internet IP by Mail';
var _upnp_choice='Using UPnP to Map Port';
var _upnp_status='UPnP Status';
var _upnp_msg0='No Action';
var _upnp_msg1='UPnP Succeed';
var _upnp_msg2='UPnP Failed: Camera System Error';
var _upnp_msg3='UPnP Failed: Errors in Network Communication';
var _upnp_msg4='UPnP Failed: Errors in Chat with UPnP Camera';
var _upnp_msg5='UPnP Failed: Rejected by UPnP Camera, Maybe Port Conflict';
var _sender='Sender';
var _receiver='Receiver';
var _mailssl='SSL';
var _smtp_svr='SMTP Server';
var _smtp_auth='Need Authentication';
var _smtp_user='SMTP User';
var _smtp_pwd='SMTP Password';
var _ftp_svr='FTP Server';
var _ftp_port='TFTP Port';
var _ftp_user='FTP User';
var _ftp_pwd='FTP Password';
var _ftp_dir='FTP Upload Folder';
var _ftp_mode='FTP Mode';
var _ftp_upload_enable='Upload Image Now';
var _ftp_upload_interval='Upload Interval (Seconds)';
var _ftp_upload_stretch='Upload of pictures';
var _motion_enable='Motion Detect Armed';
var _motion_sensitivity='Motion Detect Sensibility';
var _high='High';
var _medium='Medium';
var _low='Low';
var _extern_enable='Extern input Armed';
var _alarm_mail_enable='Send Mail on Alarm';
var _alarm_ftp_enable='Upload(FTP) Image on Alarm';
var _alarm_linkage_enable='IO Linkage on Alarm';
var _alarm_http_enable='Send Alarm Notification by Http';
var _alarm_http_url='Http URL';
var _ddns_service='DDNS Service';
var _ddns_user='DDNS User';
var _ddns_pwd='DDNS Password';
var _ddns_host='DDNS Host';
var _proxy_svr='DDNS Server';
var _proxy_port='DDNS Port';
var _dns_status='DNS Status';
var _ddns_status='Factory DDNS Status';
var _status = 'Status';
var _restart_dyndns='Re-Update Ignoring All Errors';
var _dyndns_proxy_comment='proxy config is needed if the camera is in China Mainland or HongKong';
var _restart_dyndns_comment='never do this unless your hostname has been unblocked';
var _ddns_noaction='No Action';
var _ddns_waiting='Connecting ...';
var _ddns_cannotconnect='Errors in Network Communication';
var _factory_ok='Succeed';
var _factory_noauth='Failed: Incorrect User or Password';
var _factory_noid='Failed: The Account Does not Exist';
var _factory_over='Failed: The Account is Outdated';
var _factory_iddisable='Failed: The Account is Disabled';
var _factory_errparam='Failed: Error Params';
var _factory_unknownerr='Failed: Unknown Error';
var _3322_ok='Succeed';
var _3322_sys_err='Failed: Dyndns.org System Error';
var _3322_badauth='Failed: Incorrect User or Password';
var _3322_donator='Failed: Need Credited User';
var _3322_notfqdn='Failed: Illegal Host Format';
var _3322_nohost='Failed: The Host Does not Exist';
var _3322_yours='Failed: The Host Does not Belong to You';
var _3322_numhost='Failed: Too Many or Too Few Hosts';
var _3322_abuse='Failed: The Host is Blocked for Abusing';
var _3322_server_err='Failed: Dyndns.org Server Error';
var _3322_chat_err='Failed: Bad Reply from Server';
var _dyndns_ok='Succeed';
var _dyndns_sys_err='Failed: Dyndns.org System Error';
var _dyndns_badauth='Failed: Incorrect User or Password';
var _dyndns_donator='Failed: Need Credited User';
var _dyndns_notfqdn='Failed: Illegal Host Format';
var _dyndns_nohost='Failed: The Host Does not Exist';
var _dyndns_yours='Failed: The Host Does not Belong to You';
var _dyndns_numhost='Failed: Too Many or Too Few Hosts';
var _dyndns_abuse='Failed: The Host is Blocked for Abusing';
var _dyndns_server_err='Failed: Dyndns.org Server Error';
var _dyndns_chat_err='Failed: Bad Reply from Server';
var _oray_chat_err='Failed: Bad Reply from Server';
var _oray_bad_auth='Failed: Incorrect User or Password';
var _oray_bad_host='Failed: Incorrect Hostname';
var _oray_standard_ok='Oray(Standard) Succeed';
var _oray_professional_ok='Oray(Professional) Succeed';
var _9299_ok='Succeed';
var _9299_unknown_err='Failed: Unknown Error';
var _9299_er='Failed: The user has expired';
var _9299_da='Failed: The user does not activate';
var _9299_sne='Failed: Incorrect User or Password';
var _9299_ne='Failed: The domain does not exist';
var _9299_chat_err="Failed: Bad Reply from Server";
var _ddns_ok='DDNS Succeed';
var _ddns_failed='DDNS Failed';
var _yu_ddns_ok='Vidamax Succeed';
var _yu_ddns_failed='Vidamax Failed';
var _devicelist_inlan='Camera List in Lan';
var _subnet_nomatch='Subnet does not Match';
var _1st_device='The 1st Camera';
var _2nd_device='The 2nd Camera';
var _3rd_device='The 3rd Camera';
var _4th_device='The 4th Camera';
var _5th_device = 'The 5th Camera';
var _6th_device = 'The 6th Camera';
var _7th_device = 'The 7th Camera';
var _8th_device = 'The 8th Camera';
var _9th_device = 'The 9th Camera';
var _none='None';
var _this_device='This Camera';
var _host='Host';
var _add='Add';
var _remove='Remove';
var _multidevice_attention='attention: If you want to access the camera from internet, be sure the host and port that you set can be accessed from internet.';
var _wifi_choice='Using Wireless Lan';
var _wifi_power='Power On Enable';
var _wifi_encryption='Encryption';
var _wifi_wep_key_index='Default TX Key';
var _wifi_wep_key1='Key 1';
var _wifi_wep_key2='Key 2';
var _wifi_wep_key3='Key 3';
var _wifi_wep_key4='Key 4';
var _wifi_channel='Channel';
var _wifi_authtype='Authetication';
var _auth_open='Open System';
var _auth_share='Share Key';
var _wifi_keytype='Key Format';
var _hex='Hexadecimal Number';
var _ascii='ASCII Character';
var _sure_reboot='are you sure to reboot the camera?';
var _sure_restore='are you sure to restore factory settings?';
var _center='center';
var _vertical_patrol='vertical patrol';
var _horizon_patrol='horizon patrol';
var _stop_vertical_patrol='stop vertical patrol';
var _stop_horizon_patrol='stop horizon patrol';
var _start='start';
var _test='Test';
var _succeed='Succeed';
var _failed='Failed';
var _ftp_error_connect='Can not connect to the server, Por favor, por favor consulte:<br> 1. Configuración de correo electrónico del servidor FTP es correcta.<br> 2. La puerta de entrada del servidor DNS en la configuración de red básica es la correcta.';
var _ftp_error_network='Network Error, Por favor, por favor consulte:<br> 1. Configuración de correo electrónico del servidor FTP es correcta.<br> 2. La puerta de entrada del servidor DNS en la configuración de red básica es la correcta.';
var _ftp_error_server='Server Error, Por favor, por favor consulte:<br> 1. Configuración de correo electrónico del servidor FTP es correcta.<br> 2. La puerta de entrada del servidor DNS en la configuración de red básica es la correcta.';
var _ftp_error_user='Incorrect user or password';
var _ftp_error_pwd='Incorrect user or password';
var _ftp_error_dir='Can not access the folder. Please be sure the folder exists and your account is authorized';
var _ftp_error_pasv='Error in PASV mode. Please be sure the server support PASV mode';
var _ftp_error_port='Error in PORT mode. PASV mode should be selected if the camera is behind a NAT';
var _ftp_error_stor='Can not upload file. Please be sure your account is authorized';
var _smtp_error_connect='Unable to connect to the server, Please check: <br> 1. E-mail SMTP server settings are correct. <br> 2. The gateway of DNS server in Basic Network Settings is correct.';
var _smtp_error_network='Network Error, Please check: <br> 1. E-mail SMTP server settings are correct. <br> 2. The gateway of DNS server in Basic Network Settings is correct.';
var _smtp_error_server='Server Error, Please check: <br> 1. E-mail SMTP server settings are correct. <br> 2. The gateway of DNS server in Basic Network Settings is correct.';
var _smtp_error_user='Incorrect user or password';
var _smtp_error_pwd='Incorrect user or password';
var _smtp_error_sender='The sender is denied by the server. Maybe the server need to  authenticate the user, please check it and try again';
var _smtp_error_receiver='The receiver is denied by the server. Maybe because of the anti-spam privacy of the server';
var _smtp_error_message='The message is denied by the server. Maybe because of the anti-spam privacy of the server';
var _smtp_error_auth='The server does not support the authentication mode used by the camera';
var _test_info='Please click the button "Submit" to save the settings at first, and then test.';
var _lowest='Lowest';
var _wifi_mode_list='<option>Access Point</option><option>Peer to Peer</option>';
var _smtp_port='SMTP Port';
var _tz_list='<option value=39600>(GMT -11:00) Midway Islands, Samoa Islands</option><option value=36000>(GMT -10:00) Hawaii</option><option value=32400>(GMT -09:00) Alaska Standard</option><option value=28800 selected="selected">(GMT -08:00) Pacific Standard(USA and Canada)</option><option value=25200>(GMT -07:00) Mountain Standard(USA and Canada)</option><option value=21600>(GMT -06:00) Central Standard(USA and Canada), Mexico City</option><option value=18000>(GMT -05:00) Eastern Standard(USA and Canada), Lima, Bogota</option><option value=14400>(GMT -04:00)Atlantic Standard (Canada), Santiago, La Paz</option><option value=12600>(GMT -03:30) Newfoundland</option><option value=10800>(GMT -03:00) Brasilia, Buenos Aires, Georgetown</option><option value=7200>(GMT -02:00) South Geogia I.</option><option value=3600>(GMT -01:00) Reykjavik</option><option value=0>(GMT) Greenwich mean time; London, Lisbon, Casablanca</option><option value=-3600>(GMT +01:00) Brussels, Paris, Berlin, Rome, Madrid, Stockholm, Beograd, Praha</option><option value=-7200>(GMT +02:00) Athens, Jerusalem, Cairo, Helsinki</option><option value=-10800>(GMT +03:00) Nairobi, Riyadh, Moscow</option><option value=-12600>(GMT +03:30) Tehran</option><option value=-14400>(GMT +04:00) Baku, Tbilisi, Abu Dhabi, Muscat</option><option value=-16200>(GMT +04:30) Kabul</option><option value=-18000>(GMT +05:00) Islamabad, Karachi, Tashkent</option><option value=-19800>(GMT +05:30) Bombay, Calcutta, Madras, New Delhi</option><option value=-21600>(GMT +06:00) Astana, Almaty, Dhaka, Colombo</option><option value=-25200>(GMT +07:00) Bangkok, Hanoi, Jakarta</option><option value=-28800>(GMT +08:00) Beijing, Singapore, Taipei</option><option value=-32400>(GMT +09:00) Seoul, Yakutsk, Tokyo</option><option value=-34200>(GMT +09:30) Darwin</option><option value=-36000>(GMT +10:00) Guam, Melbourne, Sydney, Port Moresby, Vladivostok</option><option value=-39600>(GMT +11:00) Magadan, Solomon Islands, New Calenonia</option><option value=-43200>(GMT +12:00) Auckland, Wellington, Fiji Islands</option>';
var _decoder_config='Decoder Settings';
var _baud='Baudrate';
var _fail_forbidden='forbidden now';
var _log='Log';
var _wifi_list='Wireless Network List';
var _scan='Scan';
var _wifi_scan_info='Scanning ...';
var _backup_restore='Backup & Restore Settings';
var _backup='Backup';
var _restore='Restore';
var _wifi_networktype='Network Type';
var _triger_level='Trigger';
var _output_level='Output Level';
var _zoom_plus='zoom+';
var _zoom_minus='zoom-';
var _ptz_config='PTZ Settings';
var _autocenter='Go center on boot';
var _pt_speed='Cruising speed automatic';
var _pt_run='Cruise laps';
var _up_speed='PT Rotation Speed';
var _down_speed='Downward speed';
var _left_speed='Leftward speed';
var _right_speed='Rightward speed';
var _p2p_status='P2P Status';
var _p2p_msg0='No Action';
var _p2p_msg1='Can not connect to the server';
var _p2p_msg2='Connecting ...';
var _p2p_msg3='Disconnected for timeout';
var _p2p_msg4='Succeed and local listen port: ';
var _specify_filename='Specify Filename (exclude .jpg)';
var _specify_numberoffiles='Specify the Max Number of Files';
var _mode_Mobile = 'No Plug-In Mode (for smartphone browser)';
var _Ptz_UpText='Up';
var _Ptz_DownText='Down';
var _Ptz_LeftText='Left';
var _Ptz_RightText='Right';
var _Ptz_StopText='Center';
var _Ptz_FastText='F';
var _Ptz_SlowText='S';
var _PresetTitle='Preset:';
var _CallPreset='Call';
var _SetPreset='Set';
var _forbidden_config='Forbidden Sevice Setting';
var _media_config='Video Setting';
var _media_size='Video Size';
var _media_framerate='Frame Rate';
var _maxmedia_framerate='Maximum framerate';
var _Ispace='I Frame interval';
var _media_keyframe='Key frame';
var _media_quant='Video Quality';
var _media_ratemode='Bitrate Mode';
var _media_bitrate='Bitrate:';
var _record_sch='SD Card Status';
var _record_play='Video Replay';
var _lock_play='Alarm Replay';
var _sd_status='SD card status';
var _record_info='SD Card Playback';
var _record_filename='Record Filename';
var _record_download='download';
var _record_remove='remove';
var _record_del='del';
var _record_path='Path';
var _record_info_fielist='Record file playback';
var _record_path_path='local record file path';
var _record_schdule='Record Schedule';
var _record_sd_status='SD card status';
var _sd_exist='Initializing...';
var _sd_no='Idle';
var _record_cover='Loop rewrite';
var _record_alarm_gpio='Record for external input alarm';
var _record_alarm_motion='Record for alarm motion';
var _record_alarm_time='Schedule recording';
var _inter_addr='inter ip address';
var _extern_addr='extern ip address';
var _sd_status='SD card size';
var _sd_status1='SD card free size';
var _MaxRate ='Frame Rate:';
var _PresetGroup = 'cruise group'; 
var _PresetGroup_Excute = 'implementation'; 
var _PresetGroup_Cancel = 'Cancel'; 
var _PresetGroup_Tip = 'cruise group script: \n\nsuch as: \n \np1w5p2w10: call the preset position, said a stay for 5 seconds, and then call the preset position 2 to stay for 10 seconds, repeat. \n \n Note: residence time in seconds, and must be greater than 5 seconds to be effective.';
var _motion_preset='Call preset position on Alarm';
var _presetenable='Enable preset';
var _preset_onstart='Turn to the specified preset on starting';
var _outdoor_mode='OutDoor Mode';
var _led_mode='Signal lamp';
var _close='Disable';
var _mode_1='Enable';
var _mode_2='Mode 2';
var _paramset='Set';
var _ocx_til='OCX control that you have not installed, please download the OCX controls, and install';
var _mantain="Maintenance";
var _noocx="The activeX has not been installed or is old version. Please click ";
var _noplugin="The plug-in has not been installed or is old version. Please click ";
var _here="here</a> to download";
var _italian="italiano";
var _deutsch="Deutsch"
var _portugal="português";
var _english="ENGLISH";
var _chinese="简体中文";
var _tchinese="繁體中文";
var _french="française";
var _spanish="español";
var _russian='русских';
var _polski="Polski";
var _Korea="한국의"
var _JPN="日本語"
var _language="Language:"
var _channel="channel";
var _channel1="channel1";
var _channel2="channel2";
var _channel3="channel3";
var _language2="Language"
var _noshownext='do not show next time';
var _noshowhome='do not show the first page';
var _factoryDDNS='Factory DDNS';
var _server='Server';
var _factoryurl='The remote URL';
var _acc='Account';
var _moresmoreh='the smaller number,the higher quality';
var _moresmorelm='(the smaller number,the higher sensitivity)';
var _m_iphone='iPod/iPhone/iPad user interface';
var _circle='Patrol a circle then go to the central';
var _cbr='Constant bitrate(CBR)';
var _vbr='Variable bitrate(VBR)';
var _ftpportmode='PORT Mode';
var _ftppasvmode='Passive Mode';
var _website='Official website';
var _onhelp='Online Support';
var _app='Surveillance Platform';
var _bbs='Technology Forum';
var _hourselhint='Double-click to selecte one hour';
var _needadminacc='Need to set at least one administrator account.';
var _forlan='LAN recommended';
var _forADSL='ADSL recommended';
var _selall='Select All';
var _smtp_tls='Transport Layer Security Protocol';
var _gmail_prompt='Gmail only support TLS at 465 port and STARTTLS at 25/587 port.';
var _showosd='Show date time stamp on the video';
var _suredelrec='Sure to delete this video?';
var _switchon2='On';
var _switchoff2='Off';
var _mode_Client='Super Client (Recommendation)';
var _download='Download';
var _ErrRTSPNoEmpty='user and password can not be empty';
var _ironoff='IR light on/off';
var _default_s='Default';
var _syscfg='System Settings';
var _ip_config='Network Settings';
var _trigger='Alarm triggers';
var _action='Alarm actions';
var _set_ptz_speed='Set turn speed';
var _bookmark='You can add this page to bookmark';
var _Enable='Enable';
var _SDRe='Insertion or removal of SD card, you need to re-plug the camera\'s power';
var _recschsel='In the selected time frame, the camera will automatically record to SD card. When SD is full, it will automatically delete old video files.';
var _alarmtime='Click the mouse to select the start time, and then click to select the end of time. Only in the selected time, the alarm will be effective.';
//functions start
var _f_gkhm='View real-time video';
var _f_lsd='Fluency';
var _f_ls='Smooth (H.264)';
var _f_nls='Not smooth (MJPEG)';
var _f_dhm='Multi-window';
var _f_9hm='9 windows';
var _f_1hm='1 window';
var _f_81hm='81 windows';
var _f_azcj='Need to install plug-ins';
var _f_jt='Sound monitoring';
var _f_dj='Intercom';
var _f_ytkz='PTZ control';
var _f_ytsd='PTZ speed adjustment';
var _f_sdpz='Manual snapshot';
var _f_sdlx='Manual recording';
var _f_xgspcs='Modify video parameters';
var _f_dyyzw='Call the preset position';
var _f_szyzw='Set Preset';
var _f_ytxh='PTZ Cruise';
var _f_txdz='Mirror image, reverse';
var _f_yzwxh='Preset cruise';
var _f_szbj='Digital zoom';
var _f_zcqt='Other Camera Support';
var _f_lxfg='Video loop coverage';
var _f_bjdz='Alarm action';
var _f_sdlxxz='SD card video download';
var _f_sdhf='SD Card Playback';
var _f_lxgl='Video, alarm records management';
var _f_zhfp='Account assignment';
var _f_wlfb='Web Publishing history';
var _f_plxz='Available for bulk download';
var _f_dgxz='Single Download';
var _f_bjdz2='Sound, video, snapshot, Email, FTP, telephone, Skype, call the preset position';
//functions end
var _funcdesc='Mode Comparison';
var _sdcard_alarm='Please format sd card!';
var _mediatip='&nbsp;&nbsp;1. These settings affect the video quality and fluency, and also affect the SD card recording time. Please configure it according to the bandwidth of the camera.<br>&nbsp;&nbsp;2. If you are concerned about the smoothness of mobile phone access, please select the QVGA size video.<br>&nbsp;&nbsp;3. If Variable bitrate(VBR) is selected, when the screen does not change, the data volume will be very small. when the screen changes considerably,the data volume will suddenly increases.<br>&nbsp;&nbsp;4. If Constant bitrate(CBR) is selected, when the screen does not change, the data volumen is about the "bitrate" value, when the screen changes considerably, the data volume will change also, but the rate of change will not be much.<br>&nbsp;&nbsp;5. Variable bitrate(VBR) is recommended in LAN. where the bandwidth is small,Constant bitrate(CBR) is recommended, and select a matching "bitrate" value.<br>&nbsp;&nbsp;6. "Video Quality" option for video quality and the data volume has a greater impact. "Video Qulity" 1 is almost "Video Qulity" 15 of 4 times.<br>&nbsp;&nbsp;7. Reduce the frame rate can also significantly reduce the data volume, such as adjusting the frame rate from 30fps to 15fps, reduced to half the data volume, for 15fps the human eye does not have a clear sense of pause.';
var _addr='Address code';
var _clearlog='Clear';
var _sure_clearlog='Sure to clear the log?';
var _user_tip='&nbsp;&nbsp;1.Administrator account has all privileges;<br>&nbsp;&nbsp;2.Operator account can watch the video, play back SD video, control the PTZ, adjust the video parameters, can not set the parameters;<br>&nbsp;&nbsp;';
var _tip_domain='The camera\'s real domain name, can be used for third-party software.';
var _factoryrtspurl='RTSP Address';
var _factorydomain='Real domain name';
var _SDK_activex='ActiveX (OCX)';
var _SDK_cgi='CGI interface';
var _SDK_protocol='Private protocol';
var _SDK_rtsp='RTSP';
var _SDK_tip_activex='Way of using ActiveX';
var _SDK_tip_cgi='HTTP CGI interface. Functions: <br> 1.To get and set camera parameters. <br>2.To get audio and video(livestream.cgi,videostream.cgi,snapshot.cgi). <br>3.PTZ control(decoder_control.cgi). <br>4.To get and download the video file in SD card(get_record_file.cgi). <br>the development is relatively simple.<br><a class="blue" download</a>';
var _SDK_tip_protocol='Private protocol interface. Functions: <br>1.To get audio and video. <br>2.To get and set camera parameters. <br>3.PTZ control.<b4>4.Talk.<br>5.To get and download the video file in SD card. <br>This method reality most versatile, but relatively large development effort.<br><a class="blue" >download</a>';
var _SDK_tip_RTSP='RTSP streaming interface. Standard RTSP protocol.';
var _developer='Developer';
var _whatrtsphint='What is RTSP?';
var _whatrtsp='Real Time Streaming Protocol RTSP is co-sponsored by RealNetworks and Netscape, and used to implement audio and video streams. Many video players support RTSP protocol, such as QuickTime, VLC, RealPlayer. There are many players support RTSP protocol on mobile phone.';
var _uid_config='UID Configuration';
var _uid_uid='UID:';
var _uid_model='Model:';
var _uid_vendor='Vendor:';
var _alarm_url="Call URL on alarm";
var _alarm_url_tip="Format for http://xxxx/x?x=x/x=x; Replace \'&\' with \'/\' in parameters section";
var _norec='No video files';
var _rec_reservedDiskSpace="Reserved disk space(MB)";
var _rec_FileLen="Record file length(MB)";
var _rec_FileLen_1="Least 100MB, MAX 1000MB";
var _rec_TimeLen="Record time length(Minute)";
var _rec_TimeLen_1="Least 5 Minutes, MAX 120 Minutes";
var _rec_reservedDiskSpace_1="Least 200MB";
var _rec_Cover="Record cover";
var _Saturation='Saturation';
var _hue='Sharpness';
var _signal='Signal';
var _sd_sdtotal="SD card total capacity(M)";
var _sd_sdfree="SD card remaining capacity(M)";
var _disk_1="Format";
var _disk_2="SD card is not inserted";
var _disk_3="Unformatted SD card";
var _disk_4="SD card is mounted";
var _disk_5="Formatting SD card";
var _disk_6="SD card is unloaded";
var _rec_sch_time="Record time(minute)";
var _rec_sch_time_1="Recording time range: 5~180 minutes";
var _access="Download";
var _onlinecd='Online CD';
var _confirmfmtSD="Sure to format the SD card? SD Cary data will be deleted all.";
var _confirmremSD='Sure you want to remove the SD card?';
var _sd_mount='Mounting';
var _alarm_record="Record Video to SD Card on Alarm";
var _localrecord="Local Record & Snapshot";
var _videorecord="Video Record";
var _disconnect="Disconnect";
var _closure="Closure";
var _audioin="Audio Source";
var _mic="Built-in microphone";
var _line="External linear input";
var _AudioOption="Audio";
var _PwdFormat="The length of the password must be greater than or equal to 8 and the letters or numbers.";
var _alarm_audio_enable="Camera playback alarm sound";
var _record_audio="Record Audio";
var _record_ss_0="Record in all time";
var _record_sensitivity="Record Mode";
var _involume='Headset';
var _outvolume='Speaker';
var _volume='volume:';
var _setosd='On OSD';
var _record_stream="Video stream selection";
var _manufacturer="manufacturer";
var _sdk_ver="SDK Version";
var dev_status="Device Status";
var _delete_photo="Are you sure you want to delete these images?";
var _temperature_name = "Unit:";
var _thermometric='Main';
var _storage='Storage';
var _settings='Settings';
var _Network='Network';
var _maintenance='Maintenance';
var _login='Login';
var _platform='Platform';
var _box_messure='BOX MEASURE:';
var _spot_messure='SPOT MEASURE:';
var _line_messure='LINE MEASURE:';
var _infrared='Thermal';
var _visible='Optical';
var _fuse='Thermal MSX';
var _model='Mode';
var _color_plate='Color Plate';
var _white='White';
var _black='Black';
var _iron='Iron';
var _redyellow='Red&Yellow';
var _bluered='BlueGreenRed';
var _rainbow1='Rainbow1';
var _rainbow2='Rainbow2';
var _blackred='BlackRed';
var _celsius='℃';
var _fahrenheit='℉';
var _rankine='°R';
var _reaumur='°Re';
var _absolute='K';
var _lighting='LED';
var _off='Off';
var _on='On';
var _horizontal='Horizontal';
var _vertical='Vertical';
var _autoName='Auto';
var _auto='Auto(default)';
var _tenMinu='Auto(~10min)';
var _thirtyMinu='Auto(~30min)';
var _sixtyMinu='Auto(~60min)';
var _global_param='Global Paramenters';
var _emissivity='Emissivity';
var _distance='Distance';
var _reflected='Reflected Temperature';
var _external_ir='External IR window';
var _external_temp='>>Temperature';
var _external_tran='>>Transmission(%)';
var _relative_humidity='Relative Humidity';
var _atmospheric_temperature='Atmospheric Temperature';
var _leftOffset='Xoffset';
var _topOffset='Yoffset';
var _zoomX='Xzoom';
var _zoomY='Yzoom';
var _elimination='alarm elimination';
var _area='Area';
var _spot='spot';
var _aline='line';
var _alarm='alarm';
var _operatorLogin='Operator';
var _adminLogin='Admin';
var _nameRemind='Please input the correct login account!';
var _pswRemind='Please input the correct login password!';
var _rememberPsw='Remember the password';
var _loadName='User name';
var _loadPsw='password';
var _measure='Measure';
var _tempSection='Range';
var _normal='Normal';
var _extension='Extension';
var _loadTitle='Login Options';
var _analogVideoOut='Output';
var _shutdown='SHUT DOWN';
var _infrared_on='infra-red(on)';
var _infrared_off='infra-red(off)';
var _visible_on='visible(on)';
var _visible_off='visible(off)';
var _delete_record='Are you sure you want to delete these videos?';
var _format='Are you sure you want to format it? All videos will be deleted!';
var _restart='Restart';
var _reflectivity='Reflectivity:';
var _airTemp='Air Temp(℃):';
var _targetTemp='Target Temp(℃):';
var _atmosTrans='Atmos Trans:';
var _distance='distance(m):';
var _infraredWindow='Infrared Window:';
var _infraredTemp='>>Infrared Temp(℃):';
var _infraredRadia='>>Infrared Radia(%):';
var _device_setting='Device Setting';
var _device_name='Device Name';
var _tempTracking='Mouse';
var _true='True';
var _false='False';
var _alarm_in='Alarm input';
var _alarm_out='Alarm Output';
var _active_high='Active High';
var _active_low='Active Low';
var _sd_format_tips='SD card is formatting, please wait...';
var _fmt_success='Format success';
var _fmt_failed='Format failed';
var _fmt_timeout='Format timeout';
var _sdcard_nonexist='SD card does not exist';
var _set_success='Success';
var _video_mode='Video mode';
var _fine_tuning='Fine-tuning';
var _dist_adjust='Distance adjustment';
var _dire_adjust='Direction adjustment';
var _shutter_correction='Shutter correction';
var _auto_shutter='Automatic shutter correction';
var _envir_param='Environmental parameters';
var _measurement='Measurement';
var _temp_zone='Temperature range';
var _analog_video='Analog video';
var _temp_unit='Temperature unit';
var _region_params='Regional params:';
var _submit='submit';
var _calculation='Calculation:';
var _maxvalue='MAX';
var _avgvalue='AVG';
var _minvalue='MIN';
var _globalmaxval='GLOBAL-MAX';
var _globalminval='GLOBAL-MIN';
var _globalparams='Global params';
var _allow='Allow';
var _allowautocalib='Auto calib:';
var _autocalibtime='Auto calib time(s):';
var _hideTool='Hide Tool';
var _fullScreen='Full screen';
var _active='Active';
var _curve='Curve';
var _value='Value';
var _global='GLOBAL';
var _inputerror='Input error, please re-enter';
var _autoCorrectError='The automatic calibration time should not be less than 30 seconds and not more than 3600 seconds!';
var _finetuningError='The value is beyond the range, please fill it in again!Migration X (-240-240), Migration Y (-180-180), Scaling X (-240-240), Scaling Y (-180-180)';
var _confirm='Please confirm the';
var _email='e-mail';
var _snapshotSave='Snapshop saving……';
var _shopRecordTip='Please wait while you save pictures or videos.';
var _upTransfiniteError='The upper limit of measurement range should be less than 140 and less than 0!';
var _downTransfiniteError='The lower limit of measurement range must be greater than - 20 and less than 100!';
var _samplingPeriod='Sampling period';
var _upperLimit='Upper limit value';
var _lowerLimit='Lower limit value';
var _saveToPicture='Save as picture';
var _minute='minutes';
var _hour='hours';
var _snapshotStorage='Snapshot';
var _reordStorage='Record';
var _updateError='Error updating file!';
var _updatingTip='Upgrading, dont do anything';
var _uploadTip='Uploading, dont do anything';
var _browse='Browse';
var _manual_timing='Manual timing';
var _auto_timing='Auto timing';
var _ntp_address='NTP address';
var _device_time='Device time';
var _local_time='Local time';
var _valid_tftp='not valid TFTP address';
var _ntp_tips='not valid ntp address';
var _language='Language: English▽';
var _logout='[Logout]';
var _recording='Video recording……';