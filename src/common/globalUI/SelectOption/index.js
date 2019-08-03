import React from 'react';

import { Select } from 'antd';

const Option = Select.Option;

export default {
	OptionList: data => {
		if (!data) {
			return [];
		}
		let OptionMap = [
			<Option value="0" key="all_key">
				全部
			</Option>
		];
		data.map((item, index) => {
			OptionMap.push(
				<Option value={item.id} key={item.id}>
					{item.name}
				</Option>
			);
		});
		return OptionMap;
	}
};
