import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from 'assets/img/logo/logoA_lightGray2.png';
import micOff from 'assets/img/realTime/mic_off_icon.png';
import camOff2 from 'assets/img/realTime/camOff2.png';
import 'assets/css/realtime.css';
import { Button, Space } from 'antd';
import { useRecoilState } from 'recoil';
import { consultEndYn } from 'features/consult/reception';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import { ConsultingRoomButtons } from './ConsultingRoomButtons';
import * as StompJs from '@stomp/stompjs';
export const ConsultingRoom = (props) => {
    const { endOpen, resultShow, srvyShow } = props;
    // true:켜진상태 false:꺼진상태
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);
    const [shareState, setShareState] = useState(false);
    //말하고 있는 상태 체크
    const [micSpeak, setMicSpeak] = useState(false);
    //------------------------------------------------------------본인
    const [remoteMic, setRemoteMic] = useState(true);
    //vedio
    const [remoteState, setRemoteState] = useState(true);
    //화면공유
    const [remoteShare, setRemoteShare] = useState(false);
    //--------------------------------------------------------------상대방 remote
    //채팅창 숨김 여부
    const [chatState, setChatState] = useState(true);
    //채팅창 하단 ref
    const messageEndRef = useRef(null);
    //채팅창 작성 textArea
    const [chatText, setChatText] = useState(undefined);
    const chatData = [
        {
            direction: 'right',
            senderName: '돌담병원 부용주 수의사',
            message: "안녕하세요.\n돌담병원 부용주 수의사입니다.",
            time: '오후 2:30'
        },
        {
            direction: 'left',
            senderName: '초코언니',
            message: "안녕하세요.",
            time: '오후 2:30'
        },
        {
            direction: 'right',
            senderName: '돌담병원 부용주 수의사',
            message: "2023년 4월 25일, 초코가 사료를 잘 먹지 않는것에 대해 문의 주셨네요.\n최근에도 계속 그런상태이신가요?",
            time: '오후 2:31'
        },
        {
            direction: 'left',
            senderName: '초코언니',
            message: "네, 최근에도 계속 잘 안먹어서\n체중이 4키로나 줄었어요.",
            time: '오후 2:31'
        },
    ];
    //채팅목록
    const [chat, setChat] = useState([]);
    const chatRef = useRef([]);
    //접속방 번호    
    const [localRoom, setLocalRoom] = useState(10);
    //현재 본인 이름(시작전 기입한 이름)
    const [userNm, setUserNm] = useState('돌담병원 부용주 수의사');
    const [userUuid, setUserUuid] = useState(undefined);
    //종료 여부
    const [, setEndYn] = useRecoilState(consultEndYn);
    //본인 vedio
    const myVideoRef = useRef(null);
    //상대 vedio
    const remoteVideoRef = useRef(null);
    //socket 정보
    const socket = useRef(null);
    //WebRTC STUN servers
    const peerConnectionConfig = {
        'iceServers': [
            { 'urls': 'stun:stun.stunprotocol.org:3478' },
            { 'urls': 'stun:stun.l.google.com:19302' },
        ]
    };
    //접속 socket url
    //wss://localhost:8090 -local로 띄울때
    //tgdev.iptime.org:8090 - 서버
    const socketUrl = "wss://" + 'tgdev.iptime.org:8090' + "/gs-guide-websocket";
    //채팅창 변경시 스크롤 하단으로 이동
    useEffect(() => {
        if (messageEndRef === null || messageEndRef === void 0 ? void 0 : messageEndRef.current) {
            messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
        }
    }, [chat]);
    useEffect(() => {
        if (userNm) {
            guid();
            chatRef.current = [...chatData];
            setChat([...chatData]);
        }
    }, [userNm]);
    useEffect(() => {
        if (userUuid) {
            console.log('start111');
            connect(false);
        }
    }, [userUuid]);
    const connect = (errorFlag) => {
        // var socket = new SockJS("https://" + location.host + "/gs-guide-websocket");
        // stompClient = Stomp.over(socket);
        console.log('start2222');
        socket.current = new StompJs.Client({
            brokerURL: socketUrl,
            onConnect: () => {
                console.log('connect');
                sendToServer("join", {
                    from: userNm,
                    type: "join",
                    data: localRoom
                });
                if (errorFlag) {
                    sendToServer("error", {
                        from: userNm,
                        type: "error",
                        data: localRoom
                    });
                }
                socket.current.subscribe('/topic/room/' + localRoom, (msg) => {
                    messageHandler(JSON.parse(msg.body));
                }); // 연결 성공 시 구독하는 로직 실행
            }
        });
        socket.current.activate();
    };
    // 서버로 스켓 메시지 전송
    const sendToServer = (to, textMsg) => {
        const jsonMsg = JSON.stringify(textMsg);
        const bufferSize = new Blob([jsonMsg]).size;
        if (bufferSize > 65000) {
            ;
        }
        else {
            socket.current.publish("/app/" + to, {}, jsonMsg);
        }
    };
    const messageHandler = (message) => {
        switch (true) {
            case message.type.includes("Stream"):
                if (message.from !== userNm) {
                    log('Stream message recieved');
                    handleStreamMessage(message);
                }
                break;
            case message.type === "text":
                if (message.from !== userNm) {
                    log('text message recieved');
                    receiveTextMessage(message.data);
                }
                break;
            case message.type === "offer":
                if (message.from !== userNm) {
                    log('Signal OFFER received');
                    handleOfferMessage(message);
                }
                break;
            case message.type === "answer":
                if (message.from !== userNm) {
                    log('Signal ANSWER received');
                    handleAnswerMessage(message);
                }
                break;
            case message.type === "ice":
                if (message.from !== userNm) {
                    log('Signal ICE Candidate received');
                    handleNewICECandidateMessage(message);
                }
                break;
            case message.type === "join":
                // if(message.from !== localUserName) {
                handlePeerConnection(message.data);
                // }
                break;
            case message.type === "leave":
                if (message.from !== userNm) {
                    handlePeerLeave();
                }
                break;
            case message.type === "error":
                if (message.from !== userNm) {
                    log("error message recieved");
                }
                break;
            default:
                handleErrorMessage('Wrong type message received from server');
        }
        // }else{
        //     // 바이너리 메시지
        //     log(msg.data instanceof ArrayBuffer);
        //     receiveFileMessage(msg.data)
        // }
    };
    const disconnect = () => {
        sendToServer("leave", {
            from: userNm,
            type: "leave",
            data: localRoom
        });
        if (myPeerConnection) {
            log('Close the RTCPeerConnection');
            myPeerConnection.onicecandidate = null;
            myPeerConnection.ontrack = null;
            myPeerConnection.onnegotiationneeded = null;
            // 필요할시 사용
            // myPeerConnection.oniceconnectionstatechange = null;
            // myPeerConnection.onsignalingstatechange = null;
            // myPeerConnection.onicegatheringstatechange = null;
            // myPeerConnection.onnotificationneeded = null;
            // myPeerConnection.onremovetrack = null;
            // 비디오 트랙
            if (remoteVideoRef.current.srcObject)
                remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            if (myVideoRef.current.srcObject)
                myVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            remoteVideoRef.current.srcObject = null;
            myVideoRef.current.srcObject = null;
            // close the peer connection
            myPeerConnection.close();
            myPeerConnection = null;
        }
        if (socket.current !== null) {
            socket.current.disconnect();
        }
        console.log("Disconnected");
    };
    useEffect(() => {
        //화면 나갈때 실행
        return () => {
            console.log('-------------------stop');
            setChat([]);
            disconnect();
            setLocalRoom(0);
            setUserNm(undefined);
            setUserUuid(undefined);
        };
    }, []);
    const guid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            const nameUuid = v.toString(16);
            setUserUuid(nameUuid);
            return nameUuid;
        });
    };
    // 화상용
    const userConstraints = {
        audio: true,
        video: true
    };
    // 화면공유용
    const displayConstraints = {
        audio: true,
        video: true
    };
    // WebRTC variables
    let localStream;
    let myPeerConnection;
    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    const connectClient = (error) => {
        sendToServer("join", {
            from: userNm,
            type: "join",
            data: localRoom
        });
        if (error) {
            sendToServer("error", {
                from: userNm,
                type: "error",
                data: localRoom
            });
        }
    };
    const log = (message) => {
        console.log(message);
    };
    const handleErrorMessage = (message) => {
        console.error(message);
    };
    //미디어 피어 연결
    const handlePeerConnection = (negotiation) => {
        createPeerConnection();
        //getMedia();
        mediaSetting();
        if (negotiation) {
            myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
        }
    };
    const createPeerConnection = () => {
        myPeerConnection = new RTCPeerConnection(peerConnectionConfig);
        myPeerConnection.onicecandidate = handleICECandidateEvent;
        myPeerConnection.ontrack = handleTrackEvent;
        myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    };
    const mediaSetting = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => { localStream === null || localStream === void 0 ? void 0 : localStream.removeTrack(track); });
        }
        navigator.mediaDevices.getUserMedia(userConstraints)
            .then(getLocalMediaStream).catch(handleGetUserMediaError);
    };
    const getLocalMediaStream = (mediaStream) => {
        localStream = mediaStream;
        myVideoRef.current.srcObject = mediaStream;
        localStream.getTracks().forEach(track => {
            // 마이크 사용중인지 체크하기 위해 추가 S
            const microphoneSource = audioContext.createMediaStreamSource(mediaStream);
            microphoneSource.connect(analyserNode);
            // 마이크 사용중인지 체크하기 위해 추가 E
            myPeerConnection.addTrack(track, localStream);
        });
    };
    // handle get media error
    const handleGetUserMediaError = (error) => {
        log('navigator.getUserMedia error: ' + error);
        switch (error.name) {
            case "NotFoundError":
                alert("Unable to open your call because no camera and/or microphone were found.");
                break;
            case "SecurityError":
            case "PermissionDeniedError":
                // Do nothing; this is the same as the user canceling the call.
                break;
            default:
                alert("Error opening your camera and/or microphone: " + error.message);
                break;
        }
        disconnect();
    };
    const handleNegotiationNeededEvent = () => {
        myPeerConnection.createOffer().then((offer) => {
            return myPeerConnection.setLocalDescription(offer);
        })
            .then(() => {
            sendToServer('offer', {
                from: userUuid,
                type: 'offer',
                sdp: myPeerConnection.localDescription
            });
            log('Negotiation Needed Event: SDP offer sent');
        })
            .catch((reason) => {
            // an error occurred, so handle the failure to connect
            handleErrorMessage(reason);
        });
    };
    const handleOfferMessage = (message) => {
        log('Accepting Offer Message');
        const desc = new RTCSessionDescription(message.sdp);
        if (desc != null && message.sdp != null) {
            log('RTC Signalling state: ' + myPeerConnection.signalingState);
            myPeerConnection.setRemoteDescription(desc).then(() => {
                log("-- Creating answer");
                return myPeerConnection.createAnswer();
            })
                .then((answer) => {
                log("-- Setting local description after creating answer");
                return myPeerConnection.setLocalDescription(answer);
            })
                .then(() => {
                log("Sending answer packet back to other peer");
                sendToServer('answer', {
                    from: userUuid,
                    type: 'answer',
                    sdp: myPeerConnection.localDescription
                });
            })
                .catch(handleErrorMessage);
        }
    };
    const handleAnswerMessage = (message) => {
        log("The peer has accepted request");
        myPeerConnection.setRemoteDescription(message.sdp).catch(handleErrorMessage);
    };
    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            sendToServer('ice', {
                from: userUuid,
                type: 'ice',
                candidate: event.candidate
            });
            log('ICE Candidate Event: ICE candidate sent');
        }
    };
    const handleNewICECandidateMessage = (message) => {
        const candidate = new RTCIceCandidate(message.candidate);
        log("Adding received ICE candidate: " + JSON.stringify(candidate));
        myPeerConnection.addIceCandidate(candidate).catch(handleErrorMessage);
    };
    const handleTrackEvent = (event) => {
        log('Track Event: set stream to remote video element');
        remoteVideoRef.current.srcObject = event.streams[0];
    };
    /* const getMedia = () => {
        if (localStream) {
            localStream?.getTracks().forEach(track => {
                localStream.removeTrack(track)
            });
        }
        navigator?.mediaDevices.getUserMedia(userConstraints)
            .then(getLocalMediaStream).catch(handleGetUserMediaError);
    } */
    //상대에게서 들어오는 메세징 처리
    const handleStreamMessage = (message) => {
        switch (message.type) {
            case "videoStreamOn":
                setRemoteState(true);
                break;
            case "videoStreamOff":
                setRemoteState(false);
                break;
            case "audioStreamOn":
                setRemoteMic(true);
                remoteVideoRef.current.muted = false;
                break;
            case "audioStreamOff":
                setRemoteMic(false);
                remoteVideoRef.current.muted = true;
                break;
            case "shareStreamOn":
                setRemoteShare(true);
                break;
            case "shareStreamOff":
                setRemoteShare(false);
                break;
        }
    };
    //마이크 사용중인지 체크
    const getFrequencyData = () => {
        // create a new array of 8-bit integers (0-255)
        const data = new Uint8Array(analyserNode.frequencyBinCount);
        // populate the array with the frequency data
        analyserNode.getByteFrequencyData(data);
        // 마이크에 감지되는 평균 볼륨 계산
        const averageVolume = data.reduce((acc, val) => acc + val) / data.length;
        // 일정 볼륨 이상으로 마이크 사용중인지 체크
        if (averageVolume > 20) {
            // console.log("말하는중!");
            //마이크 체크 표시하기
            setMicSpeak(true);
        }
        else {
            //마이크 체크 표시풀기
            setMicSpeak(false);
        }
    };
    // setInterval(getFrequencyData, 50);
    //카메라 제어 버튼 클릭 이벤트
    const handleCamBtnClick = () => {
        if (camState) {
            sendToServer('videoStreamOn', {
                from: userUuid,
                type: 'videoStreamOff',
                data: localRoom ? localRoom : 10
            });
            setCamState(false);
        }
        else {
            sendToServer('videoStreamOn', {
                from: userUuid,
                type: 'videoStreamOn',
                data: localRoom ? localRoom : 10
            });
            setCamState(true);
        }
    };
    //마이크 제어버튼 클릭 이벤트
    const handlMicBtnClick = () => {
        if (micState) {
            sendToServer('audioStreamOff', {
                from: userUuid,
                type: 'audioStreamOff',
                data: localRoom ? localRoom : 10
            });
            setMicState(false);
        }
        else {
            sendToServer('audioStreamOn', {
                from: userUuid,
                type: 'audioStreamOn',
                data: localRoom ? localRoom : 10
            });
            setMicState(true);
        }
    };
    //화면공유 버튼클릭 이벤트
    const handleShareBtnClick = async () => {
        if (shareState) {
            //화면공유 켜져있을때 끄기
            localStream === null || localStream === void 0 ? void 0 : localStream.getTracks().forEach(track => {
                track.stop();
                localStream === null || localStream === void 0 ? void 0 : localStream.removeTrack(track);
                myPeerConnection === null || myPeerConnection === void 0 ? void 0 : myPeerConnection.removeTrack(myPeerConnection.getSenders().find((sender) => sender.track === track));
            });
            // 사용자의 스트림을 가져옴
            navigator.mediaDevices.getUserMedia(userConstraints)
                .then((userStream) => {
                localStream = userStream;
                myVideoRef.current.srcObject = userStream;
                localStream.getTracks().forEach(track => {
                    myPeerConnection === null || myPeerConnection === void 0 ? void 0 : myPeerConnection.addTrack(track, localStream);
                });
            }).catch(handleGetUserMediaError);
            setShareState(false);
            sendToServer('shareStreamOn', {
                from: userUuid,
                type: 'shareStreamOff',
                data: localRoom ? localRoom : 10
            });
            myVideoRef.current.muted = false;
        }
        else {
            //화면공유 꺼져있을때 켜기
            localStream === null || localStream === void 0 ? void 0 : localStream.getTracks().forEach(track => {
                track.stop();
                localStream === null || localStream === void 0 ? void 0 : localStream.removeTrack(track);
                myPeerConnection === null || myPeerConnection === void 0 ? void 0 : myPeerConnection.removeTrack(myPeerConnection.getSenders().find((sender) => sender.track === track));
            });
            // 화면 공유 스트림 가져옴
            const displayStream = await navigator.mediaDevices.getDisplayMedia(displayConstraints);
            // 사용자의 audio 스트림만 가져옴
            const userStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            // 두개의 스트림을 합침(화면공유 video/audio, 사용자 audio)
            const combinedStream = new MediaStream([
                ...displayStream.getVideoTracks(),
                ...displayStream.getAudioTracks(),
                ...userStream.getAudioTracks()
            ]);
            // 브라우저 공유 중지 버튼을 눌렀을때 화면 공유 off
            combinedStream.getVideoTracks()[0].onended = () => {
                localStream.getTracks().forEach(track => {
                    track.stop();
                    localStream === null || localStream === void 0 ? void 0 : localStream.removeTrack(track);
                    myPeerConnection === null || myPeerConnection === void 0 ? void 0 : myPeerConnection.removeTrack(myPeerConnection.getSenders().find((sender) => sender.track === track));
                });
                // 사용자의 스트림을 가져옴
                navigator.mediaDevices.getUserMedia(userConstraints)
                    .then((userStream) => {
                    localStream = userStream;
                    myVideoRef.current.srcObject = userStream;
                    localStream === null || localStream === void 0 ? void 0 : localStream.getTracks().forEach(track => {
                        myPeerConnection.addTrack(track, localStream);
                    });
                }).catch(handleGetUserMediaError);
                // 상대방에게 화면공유 비활성화를 알림
                sendToServer('shareStreamOff', {
                    from: userUuid,
                    type: 'shareStreamOff',
                    data: localRoom
                });
                setShareState(false);
            };
            localStream = combinedStream;
            myVideoRef.current.srcObject = combinedStream;
            localStream.getTracks().forEach(track => {
                myPeerConnection === null || myPeerConnection === void 0 ? void 0 : myPeerConnection.addTrack(track, localStream);
            });
            sendToServer('shareStreamOn', {
                from: userUuid,
                type: 'shareStreamOn',
                data: localRoom ? localRoom : 10
            });
            //현재 상태 변경
            setShareState(true);
            setCamState(true);
            myVideoRef.current.muted = false;
        }
    };
    //문진표 버튼 클릭 이벤트
    const handleServeyBtnClick = () => {
        srvyShow();
    };
    //상담결과 버튼 클릭 이벤트
    const handleResultBtnClick = () => {
        setEndYn(false);
        resultShow();
    };
    //엔터로 채팅
    const onCheckEnter = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            init();
        }
    };
    //init 함수
    const init = () => {
        // 메시지 전송
        sendMessage(chatText);
    };
    //채팅 메세지 UI
    const createMessageTag = (data) => {
        return (React.createElement("div", { style: data.direction === 'left' ?
                {
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: 15,
                    alignItems: 'left'
                } : {
                width: '100%',
                textAlign: 'right',
                marginBottom: 15,
                alignItems: 'right'
            } },
            React.createElement("div", { style: {
                    marginBottom: 5
                } },
                React.createElement("span", { style: {
                        fontSize: '0.9rem',
                        color: '#ffbc00',
                        fontWeight: 600
                    } }, data.senderName)),
            React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: data.direction === 'left' ? 'left' : 'right',
                } },
                data.direction === 'right' &&
                    React.createElement("div", { style: { alignItems: 'end', display: 'flex', marginRight: 5, fontSize: '0.7rem', color: '#4d4d4d' } },
                        React.createElement("span", null, data.time)),
                React.createElement("div", { style: {
                        width: 'max-content',
                        whiteSpace: 'pre-wrap',
                        backgroundColor: data.direction === 'left' ? '#EEEDEC' : '#f9e6a5',
                        borderRadius: 10,
                        padding: '8px 12px',
                        boxShadow: '1px 1px 5px 3px #0000001a',
                        maxWidth: '100%'
                    } },
                    React.createElement("span", null, data.message)),
                data.direction === 'left' &&
                    React.createElement("div", { style: { alignItems: 'end', display: 'flex', marginLeft: 5, fontSize: '0.7rem', color: '#4d4d4d' } },
                        React.createElement("span", null, data.time)))));
    };
    // 메세지 태그 생성
    const chatListView = useCallback(() => {
        return (chat === null || chat === void 0 ? void 0 : chat.map((data) => {
            return createMessageTag(data);
        }));
    }, [chat]);
    // 채팅 메세지 채팅 배열에 추가
    const appendMessageTag = (senderNm, text) => {
        const newChat = [
            ...chatRef.current,
            {
                direction: senderNm === userNm ? 'right' : 'left',
                senderName: senderNm,
                message: text
            }
        ];
        setChat(newChat);
        chatRef.current = newChat;
        setChatText(undefined);
    };
    //메세지 전송
    const sendMessage = (text) => {
        //서버에 전송하는 코드로 후에 대체
        const data = `{"senderName":"${userNm}", "message":"${text}"}`;
        //서버로 전송
        sendToServer("text", {
            from: userUuid,
            type: "text",
            data: data
        });
        appendMessageTag(userNm, text);
    };
    //메세지 수신
    const receiveTextMessage = (data) => {
        const parsedData = JSON.parse(data);
        appendMessageTag(parsedData.senderName, parsedData.message);
    };
    // 파일 수신
    /* const receiveFileMessage = (buffer: BlobPart) => {
        log(buffer);
        const blob = new Blob([buffer], {type: "application/pdf"});
        const file = new File([blob], "test.pdf");
    
        appendMessageTag("left", "test", null, file);
    } */
    // 상대방이 방을 나갔을때
    const handlePeerLeave = () => {
        if (remoteVideoRef.current.srcObject)
            remoteVideoRef.current.srcObject = null;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                background: 'linear-gradient(#FADF96, #FBECC2, #FCF3DA, #FBECC2, #FAE5AA )',
                width: '100vw',
                height: '100vh'
            } },
            React.createElement("div", { style: {
                    width: '100%',
                    height: '2rem',
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    paddingTop: 20,
                    paddingLeft: 20
                } },
                React.createElement("img", { src: logo, style: { height: '2rem' } }),
                React.createElement("span", { style: {
                        color: '#5e5c57',
                        fontWeight: 600,
                        fontSize: '1.5rem',
                        textShadow: '2px 2px 6px #0000001a'
                    } }, "\uC2E4\uC2DC\uAC04 \uC0C1\uB2F4")),
            React.createElement("div", { style: {
                    marginTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px 15px',
                    height: '90%',
                    width: '100%'
                } },
                React.createElement(Space.Compact, { style: (shareState && chatState) ? {
                        alignItems: 'flex-end',
                        width: '85%',
                        justifyContent: 'space-between'
                    } : (shareState && !chatState) ? {
                        alignItems: 'flex-end',
                        width: '85%',
                        justifyContent: 'space-between'
                    } : (remoteShare && chatState) ? {
                        alignItems: 'flex-start',
                        width: '85%',
                        justifyContent: 'space-between'
                    } : (remoteShare && !chatState) ? {
                        alignItems: 'flex-end',
                        width: '85%',
                        justifyContent: 'space-between'
                    } : chatState ? {
                        alignItems: 'center',
                        width: '78%',
                        justifyContent: 'space-between'
                    } : {
                        alignItems: 'center',
                        width: '100%'
                    }, direction: (remoteShare && chatState) ? "vertical" : 'horizontal' },
                    React.createElement("div", { style: shareState ? {
                            objectFit: 'contain',
                            display: 'block',
                            height: '32%',
                            width: '20%',
                            marginRight: '-15%',
                            zIndex: 2,
                            overflow: 'hidden',
                            borderRadius: 15,
                            backgroundColor: '#fef7ec6b',
                            boxShadow: '2px 2px 10px 5px #0000001a',
                        } :
                            (remoteShare && chatState) ? {
                                height: '100%',
                                width: '85%',
                                zIndex: 1,
                                overflow: 'hidden',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: 15,
                                backgroundColor: '#FEF7EC',
                                boxShadow: '2px 2px 10px 5px #0000001a',
                            } :
                                remoteShare ? {
                                    height: '100%',
                                    width: '85%',
                                    zIndex: 1,
                                    overflow: 'hidden',
                                    objectFit: 'contain',
                                    display: 'block',
                                    borderRadius: 15,
                                    backgroundColor: '#FEF7EC',
                                    boxShadow: '2px 2px 10px 5px #0000001a',
                                } :
                                    {
                                        overflow: 'hidden',
                                        objectFit: 'contain',
                                        display: 'block',
                                        width: '48%',
                                        borderRadius: 15,
                                        backgroundColor: '#FEF7EC',
                                        boxShadow: '2px 2px 10px 5px #0000001a',
                                        height: '90%',
                                        marginLeft: '2%',
                                        marginRight: !chatState ? '1rem' : 0
                                    } },
                        !remoteMic && (
                        //상대 마이크 꺼졌을때
                        React.createElement("div", { style: {
                                zIndex: 999,
                                borderRadius: 50,
                                background: '#d84242',
                                position: 'absolute',
                                width: '2.3rem',
                                height: '2.3rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            } },
                            React.createElement("img", { src: micOff, style: { width: '1.5rem', height: '1.5rem' } }))),
                        React.createElement("div", { style: { height: '15%', alignItems: 'center', display: 'flex', justifyContent: 'center' } },
                            React.createElement("span", { style: { fontSize: '1.6em', fontWeight: 600 } }, shareState ? '초코언니' : '돌담병원 부용주 수의사')),
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'center', marginTop: shareState || remoteState ? '' : '10%' } },
                            React.createElement("video", { style: (!shareState && !remoteState) ? {
                                    display: 'none'
                                } : {
                                    width: '90%',
                                    objectFit: 'contain',
                                    display: 'inline',
                                    borderRadius: 15,
                                }, autoPlay: true, playsInline: true, ref: remoteVideoRef }),
                            (!remoteShare && !remoteState) &&
                                React.createElement("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '10rem'
                                    } },
                                    React.createElement("div", { style: {
                                            color: 'gray',
                                            padding: '1rem 1.5rem',
                                            borderRadius: 20,
                                            alignItems: 'center',
                                        } },
                                        React.createElement("div", { style: { width: '100%', justifyContent: 'center', display: 'flex' } },
                                            React.createElement("img", { src: camOff2 })),
                                        React.createElement("div", { style: { width: '100%', marginTop: 10 } },
                                            React.createElement("span", { style: { fontSize: '1.2em', fontWeight: 600 } }, "\uD654\uBA74\uC774 \uAEBC\uC84C\uC2B5\uB2C8\uB2E4.")))))),
                    React.createElement("div", { style: shareState ? {
                            height: '100%',
                            width: '85%',
                            zIndex: 1,
                            overflow: 'hidden',
                            objectFit: 'contain',
                            display: 'block',
                            borderRadius: 15,
                            backgroundColor: '#FEF7EC',
                            boxShadow: '2px 2px 10px 5px #0000001a',
                        } :
                            (remoteShare && chatState) ? {
                                objectFit: 'contain',
                                marginTop: '-15rem',
                                display: 'block',
                                height: '30%',
                                width: '20%',
                                zIndex: 2,
                                overflow: 'hidden',
                                borderRadius: 15,
                                backgroundColor: '#fef7ec6b',
                                boxShadow: '2px 2px 10px 5px #0000001a',
                                marginLeft: '80%'
                            } : remoteShare ? {
                                objectFit: 'contain',
                                display: 'block',
                                height: '32%',
                                width: '20%',
                                zIndex: 2,
                                marginLeft: '-15%',
                                overflow: 'hidden',
                                borderRadius: 15,
                                backgroundColor: '#fef7ec6b',
                                boxShadow: '2px 2px 10px 5px #0000001a',
                            } :
                                {
                                    overflow: 'hidden',
                                    objectFit: 'contain',
                                    display: 'block',
                                    width: '48%',
                                    borderRadius: 15,
                                    backgroundColor: '#FEF7EC',
                                    boxShadow: '2px 2px 10px 5px #0000001a',
                                    height: '90%',
                                    marginLeft: '2%',
                                } },
                        React.createElement("div", { style: { height: '15%', alignItems: 'center', display: 'flex', justifyContent: 'center' } },
                            React.createElement("span", { style: { fontSize: '1.6em', fontWeight: 600 } }, shareState ? '돌담병원 부용주 수의사' : '초코언니')),
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'center', marginTop: shareState || remoteState ? '' : '10%' } },
                            React.createElement("video", { style: (!shareState && !camState) ? {
                                    display: 'none'
                                } : {
                                    width: '90%',
                                    objectFit: 'contain',
                                    display: 'inline',
                                    borderRadius: 15,
                                }, autoPlay: true, playsInline: true, ref: myVideoRef }),
                            (!shareState && !camState) &&
                                React.createElement("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '10rem'
                                    } },
                                    React.createElement("div", { style: {
                                            color: 'gray',
                                            padding: '1rem 1.5rem',
                                            borderRadius: 20,
                                            alignItems: 'center',
                                        } },
                                        React.createElement("div", { style: { width: '100%', justifyContent: 'center', display: 'flex' } },
                                            React.createElement("img", { src: camOff2 })),
                                        React.createElement("div", { style: { width: '100%', marginTop: 10 } },
                                            React.createElement("span", { style: { fontSize: '1.2em', fontWeight: 600 } }, "\uD654\uBA74\uC774 \uAEBC\uC84C\uC2B5\uB2C8\uB2E4."))))))),
                chatState && (React.createElement("div", { style: {
                        width: '20%',
                        backgroundColor: "white",
                        padding: '10px 5px',
                        height: '100%',
                        boxShadow: '2px 2px 10px 5px #0000001a',
                        marginLeft: 10,
                        borderRadius: 15
                    } },
                    React.createElement("div", { ref: messageEndRef, className: 'chatScroll', style: shareState ? {
                            height: '90%',
                        } : {
                            height: '90%',
                            padding: 10
                        } }, chatListView()),
                    React.createElement("div", { style: {
                            display: 'flex',
                            borderTop: 'solid 1px #e9e9e9',
                            paddingTop: 10,
                            marginTop: 10,
                            height: '8%',
                        } },
                        React.createElement(TextArea, { maxLength: 100, value: chatText, onChange: e => setChatText(e.target.value), style: { marginRight: 5, resize: 'none', borderRadius: 5, marginLeft: 5 }, onKeyDown: e => onCheckEnter(e) }),
                        React.createElement(Button, { style: { height: '100%' }, onClick: () => init(), type: 'primary' },
                            React.createElement(SendOutlined, { style: { color: 'white' } })))))),
            React.createElement(ConsultingRoomButtons, { handlMicBtnClick: () => handlMicBtnClick(), handleCamBtnClick: () => handleCamBtnClick(), handleShareBtnClick: () => handleShareBtnClick(), handleSrvyBtnClick: () => handleServeyBtnClick(), handleResultBtnClick: () => handleResultBtnClick(), handleChatBtnClick: () => setChatState(!chatState), micState: micState, camState: camState, shareState: shareState, endOpen: () => endOpen() }))));
};