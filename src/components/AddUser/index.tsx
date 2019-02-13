import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './adduser.css';

interface IProps {}

interface IState {
	first_name: string;
	last_name: string;
	position: string;
	[key: string]: any;
}

export default class AddUser extends React.Component<IProps, IState> {
	state: IState;

	constructor(props: IProps) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			position: ''
		};
	}

	private handleChange(e: any): void {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	private clear() {
		this.setState({ first_name: '' });
		this.setState({ last_name: '' });
		this.setState({ position: '' });
	}

	private error() {
		console.log('error');
	}

	private completed() {
		console.log('completed');
	}

	render() {
		return (
			<div className="au-grid-container">
				<div className="au-item">
					<input
						name="first_name"
						onChange={(e: any) => this.handleChange(e)}
						required
						type="text"
						placeholder="Enter First Name"
						value={this.state.first_name}
					/>
				</div>
				<div className="au-item">
					<input
						name="last_name"
						onChange={(e: any) => this.handleChange(e)}
						required
						type="text"
						placeholder="Enter Last Name"
						value={this.state.last_name}
					/>
				</div>
				<div className="au-item">
					<input
						name="position"
						onChange={(e: any) => this.handleChange(e)}
						required
						type="text"
						placeholder="Enter Position"
						value={this.state.position}
					/>
				</div>

				<div className="au-item">
					<Mutation
						mutation={ADD_USER}
						onError={this.error}
						onCompleted={this.completed}
						variables={this.state}
						refetchQueries={() => [{ query: GET_USERS }]}
					>
						{addUser => (
							<button
								disabled={
									!(
										this.state.first_name.length > 0 &&
										this.state.last_name.length > 0 &&
										this.state.position.length > 0
									)
								}
								onClick={() => {
									addUser();
									this.clear();
								}}
							>
								Add User
							</button>
						)}
					</Mutation>
				</div>
				<div className="au-item">
					<p>User Lists</p>
				</div>
			</div>
		);
	}
}

const GET_USERS = gql`
	{
		Users {
			id
			first_name
			last_name
			position
		}
	}
`;

const ADD_USER = gql`
	mutation addUser($first_name: String!, $last_name: String!, $position: String!) {
		addUser(first_name: $first_name, last_name: $last_name, position: $position) {
			first_name
			last_name
			position
		}
	}
`;
