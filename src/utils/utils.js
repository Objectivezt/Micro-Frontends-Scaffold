/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
	return reg.test(path);
}

/**
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
	let routes = Object.keys(routerData).filter(
		routePath => routePath.indexOf(path) === 0 && routePath !== path
	);
	routes = routes.map(item => item.replace(path, ''));
	const renderArr = getRenderArr(routes);
	const renderRoutes = renderArr.map(item => {
		const exact = !routes.some(
			route => route !== item && getRelation(route, item) === 1
		);
		return {
			exact,
			...routerData[`${path}${item}`],
			key: `${path}${item}`,
			path: `${path}${item}`
		};
	});
	return renderRoutes;
}

function getRenderArr(routes) {
	let renderArr = [];
	renderArr.push(routes[0]);
	for (let i = 1; i < routes.length; i += 1) {
		let isAdd = false;
		// 是否包含
		isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
		// 去重
		renderArr = renderArr.filter(
			item => getRelation(item, routes[i]) !== 1
		);
		if (isAdd) {
			renderArr.push(routes[i]);
		}
	}
	return renderArr;
}

export function isInArray(array, value) {
	for (let i = 0; i < array.length; i++) {
		if (value === array[i]) {
			return true;
		}
	}
	return false;
}

export function AuthRouterPass(_this, path) {
	const { location, history, globalModel = {} } = _this.props;
	let tempMenuArr = globalModel.baseRouterUrl;
	if (path) {
		if (!isInArray(tempMenuArr, path)) {
			history.push('/auth/exception/403');
			return false;
		}
	} else {
		if (!isInArray(tempMenuArr, location.pathname)) {
			if (history.location.pathname === '/auth/exception/403') {
				return;
			}
			history.push('/auth/exception/403');
			return false;
		}
	}
}

export function getBashRedirect() {
	const urlParams = new URL(window.location.href);
	const redirect = urlParams.searchParams.get('redirect');
	if (redirect) {
		urlParams.searchParams.delete('redirect');
		window.history.replaceState(null, 'redirect', urlParams.href);
	}
	return redirect;
}

export function formatterMenu(data, parentPath = '/') {
	return data.map(item => {
		let { path } = item;
		if (!isUrl(path)) {
			path = parentPath + item.path;
		}
		const result = {
			...item,
			path
		};
		if (item.children) {
			result.children = formatterMenu(
				item.children,
				`${parentPath}${item.path}/`
			);
		}
		return result;
	});
}