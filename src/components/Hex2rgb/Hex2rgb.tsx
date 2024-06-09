import classes from './hex2rgb.module.scss';
import { ChangeEvent, useState } from 'react';


export const Hex2rgb = () => {

	const [rgbColor, setRgbColor] = useState<string>('rgb(0, 0, 0)');
	const [hexColor, setHexColor] = useState<string>('#000')

	const handleConvertHex2Rgb = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setHexColor(value);
		
		if (!value) {
			setRgbColor('rgb(0, 0, 0)');
			return;
		}

		if (!value.startsWith('#')) {
			setHexColor('#' + value)
		}

		if (value.length !== 4 && value.length !== 7) {
			setRgbColor('Length must be 3 or 6 symbols');
			return;
		}


		const hex: string = value.slice(1).length === 3 ?
			value.slice(1) + value.slice(1) :
			value.slice(1);

		const r: number = parseInt(hex.slice(0, 2), 16);
		const g: number = parseInt(hex.slice(2, 4), 16);
		const b: number = parseInt(hex.slice(4), 16);

		if (isNaN(r) || isNaN(g) || isNaN(b)) {
			setRgbColor('Expected hex code');
			return;
		}

		const rgb: string = `rgb(${r}, ${g}, ${b})`;

		setRgbColor(rgb);
	};

	return (
		<div
			className={classes['hex2rgb']}
			style={{ backgroundColor: rgbColor }}>
			<form className={classes['hex2rgb__form']}>
				<input
					className={classes['hex2rgb__input']}
					id='HEX'
					name='HEX'
					type='text'
					value={hexColor}
					onChange={handleConvertHex2Rgb}
					placeholder='#000000' />
				<input
					className={classes['hex2rgb__input']}
					id='rgb'
					name='rgb'
					type='text'
					value={rgbColor}
					disabled />
			</form>
		</div>
	)
}
