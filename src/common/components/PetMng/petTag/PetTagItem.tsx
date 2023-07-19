import { Tag } from "antd";

interface PetTagItemProps {
    bred?: string;
    gndrCd?: string;
    neutYn?: string;
    age?: number;
    wght?: string;
}
export const PetTagItem = (props: PetTagItemProps) => {
    const { bred, gndrCd, neutYn, age, wght } = props;

    return (<>
        <Tag
            bordered={false}
            style={{
                borderRadius: '3px',
                color: '#685945'
            }}
            color={"#FDF5E6"}
        >
            {bred}
        </Tag>
        <Tag
            bordered={false}
            style={{
                borderRadius: '3px',
                color: '#685945'
            }}
            color={"#FDEDD1"}
        >
            {gndrCd === 'MALE' ? '수컷' : gndrCd === 'FEMALE' ? '암컷' : '알수없음'}
        </Tag>
        <Tag
            bordered={false}
            style={{
                borderRadius: '3px',
                color: '#685945'
            }}
            color={"#FDE5BC"}
        >
            {neutYn === 'Y' ? "중성화O" : "중성화X"}
        </Tag>
        <Tag
            bordered={false}
            style={{
                borderRadius: '3px',
                color: '#685945'
            }}
            color={"#FDDDA7"}
        >
            {age}살
        </Tag>
        <Tag
            bordered={false}
            style={{
                borderRadius: '3px',
                color: '#685945'
            }}
            color={"#FDD592"}
        >
            {wght}Kg
        </Tag>
    </>
    )
}