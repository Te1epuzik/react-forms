import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import classes from './steps.module.scss';
import { v4 } from 'uuid';

import { TStep } from '../../models/stepsModel';
import editIcon from '../../assets/edit.svg';
import binIcon from '../../assets/bin.svg';

export const Steps = () => {

	const inputDistance = useRef<HTMLInputElement>(null);
	const [stepsList, setStepsList] = useState<TStep[]>([]);
	const [form, setForm] = useState<TStep>({
		date: '',
		distance: '',
		id: ''
	});
	const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		setForm(prevForm => ({ ...prevForm, [name]: value }));
	}

	const handleAddStep = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!form.date || !form.distance) {
			return;
		}

		setForm({
			date: '',
			distance: '',
			id: ''
		})
		setStepsList(prevList => [
			...prevList,
			{
				date: form.date,
				distance: form.distance,
				id: v4()
			}]
		);
	}



	const handleEditStep = (id: string) => {
		const currentStep: TStep | undefined = stepsList.find((step: TStep) => step.id === id);
		setForm({
			date: currentStep?.date, 
			distance: currentStep?.distance, 
			id: ''
		});
		setStepsList(stepsList.filter(step => step.id !== id));
		inputDistance.current?.focus();
	}

	const handleRemoveStep = (id: string) => {
		setStepsList(stepsList.filter(step => step.id !== id));
	}

	return (
		<div className={classes['steps']}>
			<form
				className={classes['steps__form']}
				onSubmit={handleAddStep}>
				<label
					className={classes['form-element']}
					htmlFor='date'>{'Дата (ДД.ММ.ГГ)'}</label>
				<input
					className={classes['steps__date'] + ' ' + classes['form-element']}
					onChange={handleFormChange}
					value={form.date}
					name='date'
					id='date'
					type='date' />
				<label
					className={classes['form-element']}
					htmlFor='distance'>Пройдено км </label>
				<input
					className={classes['steps__distance'] + ' ' + classes['form-element']}
					onChange={handleFormChange}
					value={form.distance}
					name='distance'
					id='distance'
					type='text'
					autoComplete='off'
					ref={inputDistance} />
				<button
					className={classes['steps__ok-btn'] + ' ' + classes['form-element']}
					type='submit'>ok</button>
			</form>
			<ul
				className={stepsList.length > 0 ?
					classes['steps__list'] + ' ' + classes['steps__list--active'] :
					classes['steps__list']}>
				{stepsList.map((step: TStep) =>
					<li
						key={step.id}
						className={classes['steps__item']}>
						<span className={classes['steps__item-date']}>{step.date}</span>
						<span className={classes['steps__item-distance']}>{step.distance}</span>
						<div className={classes['steps__item-controll']}>
							<a
								className={classes['steps__item-edit-btn']}
								onClick={() => handleEditStep(step.id)}>
								<img src={editIcon} alt='edit button' />
							</a>
							<a
								className={classes['steps__item-delete-btn']}
								onClick={() => handleRemoveStep(step.id)}>
								<img src={binIcon} alt='bin button' />
							</a>
						</div>
					</li>
				)}
			</ul>
		</div>
	)
}