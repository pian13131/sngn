## Networks

|      | Layer       | Protocol       | Data Unit | Addressing  |
| ---- | ----------- | -------------- | --------- | ----------- |
| 5    | Application | HTTP, SMTP     | Messages  | n/a         |
| 4    | Transport   | TCP/UDP        | Segment   | Port        |
| 3    | Network     | IP             | Datagram  | IP address  |
| 2    | DataLink    | Ethernet, Wifi | Frames    | MAC address |
| 1    | Physical    | 802.11         | Bits      | n/a         |

### Node

Client : request data

Server : provide data 

### Physical

**Hubs**: Connect multiple computers at once

**Modulation :** varying the voltage of moving across cable
**Duplex communication :** info can flow in both directions across cable 

**Simplex communication** : ... 

**Network port** : RJ45

### Datalink

**Switches**: Decide talk to which device LAN : local area network 

**CSMA/CD** : determine when the communications channels are clear and when a device is free to transmit data
**MAC address** : globally unique identifier attached to an individual network interface (48bit)
**Octet** : any number that can be represent by 8 bits Unicast : always one receiving address
Multicast : multiple receiving address
Broadcast : all receiving address
**Ethernet Frame** Data packet : a set of binary data sent across network link 

### Network

**Router**: Forward data between independent networks

**IP**

- Dynamic or Static
- Belongs to a network, not for nodes in that network  

**IP Datagram** : Structured series of fields

**IP address classes** : A, B, C

**Address resolution protocol (ARP)** : To discover the hardware address of a node with certain address
**ARP table** : A list of IP addresses and MAC addresses associated with them
**Subnetting** : Process of taking a large network and splitting it up into many individual and smaller subnetworks
**Subnet mask** : To tell the router what part of IP is the Subnet ID

**Routing** :

- Receive package
- Examines destination IP
- Looks up IP destination network in routing table

- Forward traffic to destination

**Routing table** :

- Destination network 
- Total hops
- Interface 

### Transport

Direct traffic to network apps

**Dissecting of TCP segment** : TCP header + data section

**Handshake** : a way for two devices to ensure that they are speaking in the same protocol and understand each other

URG (urgent), ACK (acknownledge), PSH (push), RST (reset), SYN (synchronize), FIN (finish) 

```
Three ways handshake

1. A(SYN_SENT) --> SYN --> B
2. A <-- SYN/ACK <-- B(SYN-RECEIVED)
3. A(ESTABLISHED) --> ACK --> B

Communication start 
```

```
Four way handshake

1. A <-- FIN <-- B
2. A --> ACK --> B
3. A --> FIN --> B 
4. A <-- ACK <-- B 

communication end
```

**TCP socket state** :

- LISTEN : server
- SYN_SENT : client
- SYN-RECEIVED : pre is LISTEN and has received SYN and sent a SYN/ACK back 

- ESTABLISHED : can start sending data
- FIN_WAIT : just sent FIN
- CLOSE_WAIT : connection closed but still wait for release hold
- CLOSED : no communication possible 

**UDP**

- Stream videos
- no connection

**Firewalls**
 Block traffic when meets certain condition 

### Application

Allow app communicate in the way they understand

Include Presentation and Session

### TCP Segment Transmission Process

| Datalink Layer | Network Layer | Transport Layer | Application Layer |
| -------------- | ------------- | --------------- | ----------------- |
| MAC header     | IP header     | Port header     | Data Content      |

- Source host
    - Data (Application layer)
    - Build Segment with port header (Transport layer)
    - Build Datagram with IP header (Network layer)
    - Build Frame in with MAC header (Datalink layer)
    - Send to Router (Physical layer)
- Router
    - Check the destination MAC header if it is itself (Datalink layer)
    - Check the routing table for the new router/host to send (Network layer)
    - Rebuild Frame with new MAC header (Datalink layer)
    - Send to next router/host



### URL in browser

- Find IP for domain name
    - browser cache, OS cache, router cache, ISP cache
    - DNS server
- Make TCP connection
    - three-way handshake
- Browser send HTTP request to server
- Server handle request and sends back response



### HTTP request

**Cookie**

- A key-value pair that is stored in the user's browser

- A cookie is sent to your browser as part of the HTTP response that contains the web page you requested

- When your browser receives a cookie, it stores it, and sends it back to the server with every subsequent request it makes on the same website
- Content: Session IDs, Tracking IDs, User preferences

**Session**

- A set of data that is stored on the server, usually as key-value pairs 
- secret ID that is usually stored in the user's browser using a cookie, which  matches the name of a file containing the session data on the server
- automatically deleted if unused for some time
- Content: ID of the user currently logged in, Shopping cart

**GET**: carries request parameter appended in URL string to get some resource from server

**POST**: is more general. It is supposed to initiate any action on the server,  carries request parameter in message body

**PUT**: accept the body of the request, and then store that at the resource identified by the URI. If there is already resource, relpace it.

