import {Container, SectionTitle} from "@/app/list-a-home/common/NoHouses";
import {useState} from "react";
import {FaRegCircleQuestion} from "react-icons/fa6";

export const ToolTipParagraph = ({label, text}) => (
	<>
		<p className={'text-sm my-2'}><span className={'font-bold'}>{label}</span> {text}</p>
	</>
);
const RightForYou = (props) => {
	let [showTooltip, setShowTooltip] = useState(false);
	const toggleToolTip = () => {
		setShowTooltip(!showTooltip);
	};
	return (<Container
		className={'flex items-center'}
		style={{
			backgroundColor: '#F3F3F3',
			color: '#29262C',
			position: 'relative',
		}}>
		<SectionTitle
			className={'text-2xl md:text-3xl font-roboto me-4'}
			title={props.content.title}/>
		<FaRegCircleQuestion size={25} onClick={() => toggleToolTip()} style={{cursor: 'pointer'}}/>
		{showTooltip && <div
			className={'shadow-lg rounded-lg p-10'}
			style={{
				transform: 'translate(60%, 40%)',
				fontFamily: 'Roboto',
				position: 'absolute',
				maxWidth: '866px',
				color: '#29262c',
				backgroundColor: '#FFF',
				zIndex: 10,
			}}>
			<div
				style={{
					position: 'absolute',
					height: '0',
					width: '0',
					borderTop: '10px solid transparent',
					borderRight: '17px solid #FFF',
					borderBottom: '10px solid transparent',
					transform: 'translate(-300%, -60%)',
				}}/>
			{props.content.tooltip.map(tcont => (
				<BOTooltip key={tcont.title} title={tcont.title} content={tcont.content}/>
			))}
		</div>}
	</Container>);
};

export default RightForYou;

const BOTooltip = ({title, content}) => {
	return <div className={'py-2'}>
		<h4>{title}</h4>
		{content.map(
			tcont => (<ToolTipParagraph key={tcont.label} label={tcont.label} text={tcont.text} />)
		)}
	</div>;

};