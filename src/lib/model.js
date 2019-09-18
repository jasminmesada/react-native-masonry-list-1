import { Image,AsyncStorage } from "react-native";
import Task from "./task";
import { setItemSource } from "./../utils";

var username="";
var token="";
	AsyncStorage.getItem('username').then(value =>{
	username=value
	});
	AsyncStorage.getItem('token').then(value =>{
	token=value
});


export const resolveImage = (uri, image, data, itemSource) => {
	imageobj = (JSON.stringify(image))
	res1 = imageobj.replace("[", "")
	res2 = res1.replace("[", "")
	res3 = res2.replace("]", "")
	res4 = res3.replace("]", "")
	res5=JSON.parse(res4);
	//alert((uri))
	//alert(JSON.stringify(res5))

	if (data && itemSource && itemSource.length > 0) {
		return new Task(
			(reject, resolve) => {
				Image.getSize(uri, (width, height) => {
					image.dimensions = { width, height };
					const resolvedData = setItemSource(data, itemSource, image);
					resolve({
						...resolvedData,
					});
				// eslint-disable-next-line no-undef
				}, (err) => reject(err));
			}
		);
	}
	//headera={Authorization:'Basic bWVzamFzMToxZTY2MDJiMmM0ODIxMWU5YjBhZDA2YzlkMTM3MmRkNg=='}
	if(username != ""){
		const base64 = require('base-64');    
		var auth = base64.encode(username+':'+token)
		headera={Authorization:'Basic '+auth}
		//alert(JSON.stringify(headera))
	return new Task((reject, resolve) => Image.getSizeWithHeaders(uri,headera, (width, height) => resolve({
			...image,
		dimensions: {
			width,
			height
		}
	// eslint-disable-next-line no-undef
	}), (err) => reject(err)));
}
};

export const resolveLocal = (image, data, itemSource) => {
	if (data && itemSource && itemSource.length > 0) {
		if (image.dimensions && image.dimensions.width && image.dimensions.height) {
			const resolvedData = setItemSource(data, itemSource, image);
			return new Task((reject, resolve) => {
				resolve({
					...resolvedData
				});
			// eslint-disable-next-line no-undef
			}, (err) => reject(err));
		}
		if (image.width && image.height) {
			return new Task((reject, resolve) => {
				image.dimensions = { width: image.width, height: image.height };
				const resolvedData = setItemSource(data, itemSource, image);
				resolve({
					...resolvedData
				});
			// eslint-disable-next-line no-undef
			}, (err) => reject(err));
		}
	}
	if (image.dimensions && image.dimensions.width && image.dimensions.height) {
		return new Task((reject, resolve) => {
			resolve({
				...image
			});
		// eslint-disable-next-line no-undef
		}, (err) => reject(err));
	}
	if (image.width && image.height) {
		return new Task((reject, resolve) => {
			resolve({
				...image,
				dimensions: {
					width: image.width,
					height: image.height
				}
			});
		// eslint-disable-next-line no-undef
		}, (err) => reject(err));
	}
};
