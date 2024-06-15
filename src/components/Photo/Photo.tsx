import { ChangeEvent, useState } from 'react';
import classes from './photo.module.scss';
import { v4 } from 'uuid';
import { TDataUrl } from '../../models/photoModel';

import closeIcon from '../../assets/close.svg';

export const Photo = () => {

	const [dataUrl, setDataUrl] = useState<TDataUrl[]>([])

	const fileToDataUrl = (file: File): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.addEventListener('load', () => {
				resolve(fileReader.result);
			});

			fileReader.addEventListener('error', () => {
				reject(new Error(fileReader.error));
			});

			fileReader.readAsDataURL(file);
		});
	}

	const handleSelect = async (event: ChangeEvent<HTMLInputElement>) => {
		const files: File[] = [...event.target.files as FileList];
		const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
		const dataUrls: TDataUrl[] = urls.map(url => {return { url: url, id: v4() }})
		setDataUrl(prevData => [...prevData, dataUrls]);
		console.log(dataUrl)
	}

	const handlePhotoRemove = (id: string) => {
		setDataUrl(dataUrl.filter(image => image.id !== id));
	}

	return (
		<div className={classes['photo-wrapper']}>
			<div className={classes['photo']}>
				<form className={classes['photo__selector']}>
					<div className={classes['click-window']}>Click to select</div>
					<input
						className={classes['photo__loader']}
						type='file'
						accept='.png, .jpg, jpeg'
						onChange={handleSelect}
						multiple />
				</form>
				<div className={classes['photo__loaded']}>
					{dataUrl.map(image =>
						<div
							key={image.id}
							className={classes['photo__inner']}>
							<div className={classes['photo__interface']}>
								<span
									className={classes['photo__remove']}
									onClick={() => handlePhotoRemove(image.id)}>
									<img src={closeIcon} alt='close' />
								</span>
							</div>
							<img
								className={classes['photo__img']}
								src={image.url}
								alt='photo' />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
