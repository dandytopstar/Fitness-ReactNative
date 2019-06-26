import React from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import RatingComponent from '../utils/Rating';
import Strings from '../utils/Strings';

export const Comment = t.struct({
	rating: t.Number,
	comment: t.String,
	user: t.String,
});

export const options = {
	fields: {
		rating: {
			label: 'Rating',
			template: RatingComponent,
			config: {
				step: 1,
				min: 1,
				max: 5,
			},
		},
		comment: {
			auto: 'none',
			placeholder: Strings.ST85,
			multiline: true,
			numberOfLines: 1,
			stylesheet: {
				...Form.stylesheet,
				textbox: {
					...Form.stylesheet.text,
					normal: {
						...Form.stylesheet.textbox.normal,
						height: 50
					},
					error: {
						...Form.stylesheet.textbox.error,
						height: 50
					}
				}
			}
		},
		    user: {
      hidden: true
    }
	}
}