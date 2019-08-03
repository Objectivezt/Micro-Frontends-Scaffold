import React from 'react';
import { Select, Form, Checkbox, Button, Input, DatePicker } from 'antd';
import OptionList from '@common/globalUI/SelectOption';
import './index.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

@Form.create()
export default class GlobalForm extends React.Component {
	commit = () => {
		const { getFieldsValue } = this.props.form;
		let data = getFieldsValue();
		data.isStart = data.isStart['_i']; // 把向后段传值的moment的对象改为其_i属性；
		this.props.formSubmit(data); // 最终 向后端输出；
	};

	reset = () => {
		this.props.form.resetFields();
	};

	initFormList = () => {
		const { getFieldDecorator } = this.props.form;
		const formList = this.props.formList;
		let formItemList = [];

		if (formList && formList.length > 0) {
			formList.map(item => {
				let initialValue = item.initialValue || ''; // 默认为空
				let label = item.label; // 标题
				let placeholder = item.placeholder; // placeholder
				let width = item.width; // width
				let list = item.list || []; // option
				let field = item.field; // 字段key

				if (item.type === 'input') {
					const input = (
						<FormItem label={label} key={field}>
							{getFieldDecorator(field, {
								initialValue: initialValue
							})(<Input placeholder={placeholder} />)}
						</FormItem>
					);
					formItemList.push(input);
				} else if (item.type === 'select') {
					const select = (
						<FormItem label={label} key={field}>
							{getFieldDecorator(field, {
								initialValue: initialValue
							})(
								<Select
									style={{ width: width }}
									placeholder={placeholder}
								>
									{OptionList.OptionList(list)}
								</Select>
							)}
						</FormItem>
					);
					formItemList.push(select);
				} else if (item.type === 'checkbox') {
					const checkbox = (
						<FormItem label={label} key={field}>
							{getFieldDecorator(field, {
								valuePropName: 'checked',
								initialValue: initialValue
							})(<Checkbox>{label}</Checkbox>)}
						</FormItem>
					);
					formItemList.push(checkbox);
				} else if (item.type === 'date') {
					const dateComponent = (
						<FormItem label={label} key={field}>
							{getFieldDecorator(field, {
								initialValue: moment(initialValue, 'YYYY/MM/DD')
							})(
								<DatePicker
									showTime
									format="YY-MM-DD HH:mm:ss"
									placeholder={placeholder}
								/>
							)}
						</FormItem>
					);
					formItemList.push(dateComponent);
				}
			});
		}
		return formItemList;
	};

	render() {
		return (
			<Form layout="inline">
				{this.initFormList()}
				<FormItem>
					<Button
						type="primary"
						onClick={() => {
							this.commit();
						}}
					>
						查询
					</Button>

					<Button
						onClick={() => {
							this.reset();
						}}
					>
						重置
					</Button>
				</FormItem>
			</Form>
		);
	}
}
