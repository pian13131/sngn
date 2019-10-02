## Networks

![page1image40804688.png](/Users/lyu/Library/Application Support/typora-user-images/page1image40804688.png)

### Hubs

Connect multiple computers at once
**Collision domain**: a network segment where only one device can communicate
At physical layer 

### Switches

At Datalink layer
 decide talk to which device LAN : local area network 

***Hub and switch are for a single network***

### Router

Forward data between independent networks
At Network layer
Border Gateway Protocol (BGP) : to know most optimal paths to forward traffic 

### Node

Client : request data Server : provide data 

### Physical

Move bits
**Modulation :** varying the voltage of moving across cable **Twisted pair cable** : Avoid magnet effect
**Duplex communication :** info can flow in both directions across cable 

- Full-duplex 

- Half-duplex

**Simplex communication** : ... 

**Network port** : RJ45
Link light : two side turn on Activity light : data transmission 

### Datalink

**CSMA/CD** : determine when the communications channels are clear and when a device is free to transmit data
**MAC address** : globally unique identifier attached to an individual network interface (48bit)
**Octet** : any number that can be represent by 8 bits Unicast : always one receiving address
Multicast : multiple receiving address
Broadcast : all receiving address
**Ethernet Frame** Data packet : a set of binary data sent across network link 

### Network

**IP**:
 – 32bits
 – 0-255
 – DynamicorStatic
 – Belongstoanetwork,notfornodesinthatnetwork 

![page3image40765680.png](/Users/lyu/Library/Application Support/typora-user-images/page3image40765680.png) 

**IP Datagram** :
 – Structuredseriesoffields – 16bits 

**IP address classes** :
 – A,B,C
 – NetworkID(gateway)(8,16,24)bits – HostID(innerhost) 

Address resolution protocol :
 To discover the hardware address of a node with certain address
 **ARP table** :
 A list of IP addresses and MAC addresses associated with them
 **Subnetting** :
 Process of taking a large network and splitting it up into many individual and smaller subnetworks
 Subnet mask :
 To tell the router what part of IP is the Subnet ID
 **CIDR** : new way for subnetting
 Do not need to care about the class of IP 

**Routing** 

– Receivepackage
 – ExaminesdestinationIP
 – LooksupIPdestinationnetworkinroutingtable – Forwardtraffictodestination 

![page5image40766096.png](/Users/lyu/Library/Application Support/typora-user-images/page5image40766096.png)

Routing table :
 – Destinationnetwork 

–
 – Totalhops – Interface 

**Interior Gateway protocol :** 

Share in same organization Distance-vector protocol: 

– Sendroutingtabletoeveryneighbor 

Next hop 

![page6image57463504.png](/Users/lyu/Library/Application Support/typora-user-images/page6image57463504.png)

list state routing protocol:
 – everyrouterknowtheentirestate 

![page7image40768176.png](/Users/lyu/Library/Application Support/typora-user-images/page7image40768176.png)

**Exterior Gateway protocol :** 

Share in different organization 

**Transport** 

Direct traffic to network apps
 Multiplex : a node could deliver traffic to multiple receiving services
 demultiplex : taking traffic from multiple sending services 

Dissecting of TCP segment : TCP header + data section 

Three-ways-shakehands : a way for two devices to 

ensure that they are speaking in the same protocol and understand each other
 URG (urgent)
 ACK (acknownledge) 

PSH (push)
 RST (reset)
 SYN (synchronize) FIN (finish) 

– A--SYN->B
 – A<-SYN/ACK--B
 – A—ACK->B
 – Communicationstart 

Four-way-handshake – A<-FIN—B
 – A—ACK->B
 – A—FIN->B 

– A<-ACK—B 

TCP socket state
 LISTEN : server
 SYN_SENT : client
 SYN-RECEIVED : pre is LISTEN and has received SYN and sent a SYN/ACK back 

ESTABLISHED : can start sending data
 FIN_WAIT : just sent FIN
 CLOSE_WAIT : connection closed but still wait for release hold
 CLOSED : no communication possible 

UDP
 Stream videos 

Firewalls
 Block traffic when meets certain condition 

**Application** 

Allow app communicate in the way they understand 

- Presentation 
  
- Session 
  
- ConnecttoIP:port 
  
- checkinLocalNetwork 
  
- SenddatatoRouter 
  
- CheckMACofgateway 
  
-  ARPrequest 
  
- GetMACfromRouter 
  
- BuildTCPsegment 
  
- BuildIPdatagram 
  
- BuildEthernetdatagram 
  
- Sendtoswitch 
  
- Sendtorouter 
  
- Determinetheshortestpath 
  
- RebuildIP,Ethernetdatagram 
  
- Sendtonextnetwork,router,network.... 
  
- Arrivefinalcomputer 
  
- OnesingleTCPsegmenttransmissionaccomplished
  

![page10image42926080.png](/Users/lyu/Library/Application Support/typora-user-images/page10image42926080.png) 