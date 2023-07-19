import React, { useEffect, useState } from 'react';
import { ConsultEndModal, ConsultResultModal, ConsultingRoom, SurveyListModal, consultEndYn } from 'features/consult';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

const Realtime = () => {

    const navigate = useNavigate();

    //모달 표시 state
    const [consultEndShow, setConsultEndShow] = useState<boolean>(false);
    const [resultShow, setResultShow] = useState<boolean>(false);
    const [srvyShow, setSrvyShow] = useState<boolean>(false);

    //종료상태 확인
    const [, setEndYn] = useRecoilState(consultEndYn);

    const handleCloseConsult = () => {
        navigate(-1);
    }

    const handleEndResult=() =>{
        setConsultEndShow(true);
        setEndYn(true);
    }

    useEffect(() => {
        //화면 나갈때 실행
        return () => {
            setEndYn(false);
        }
    }, []);

    return (
        <>
            <ConsultingRoom
                endOpen={() => handleEndResult()}
                resultShow={() => setResultShow(!resultShow)}
                srvyShow={() => setSrvyShow(!srvyShow)}
            />
            {
                consultEndShow &&
                <ConsultEndModal
                    closeModal={() => setConsultEndShow(false)}
                    open={consultEndShow}
                    closeConsult={() => handleCloseConsult()}
                    showResult={() => setResultShow(true)}
                />
            }
            {
                resultShow &&
                <ConsultResultModal
                    closeModal={() => setResultShow(false)}
                    open={resultShow}
                    closeConsult={() => handleCloseConsult()}
                />
            }
            {
                srvyShow &&
                <SurveyListModal
                    closeModal={() => setSrvyShow(false)}
                    open={srvyShow}
                />
            }
        </>
    );
};

export default Realtime;