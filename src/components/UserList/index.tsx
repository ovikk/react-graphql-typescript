import * as React from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './UserList.css';
import { Mutation } from 'react-apollo';

interface IProps {
}

interface IState {
	id: string
	first_name: string;
	last_name: string;
	position: string;
	[key: string]: any;
}

export default class UserList extends React.Component<IProps, IState> {
	state: IState;

	constructor(props: IProps) {
		super(props);
		this.state = {
			id: '-1',
			first_name: '',
			last_name: '',
			position: '',
			isEditable: false
		};
	}

	private editUser = (id: string,first_name: string,last_name: string,position: string) => {
		this.setState({ id: id,first_name:first_name,last_name:last_name,position:position,isEditable: true });
	};

	private cancelUser = () => {
		this.setState({ id: '-1', isEditable: false });
	};

	private handleChange(e: any): void {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<Query query={GET_USERS}>
				{({ data, loading }) => {
					if (loading) return 'Loading...';
					return (
						data &&
						data.Users &&
						data.Users.map((user: any) => (
							<div key={user.id}>
								{
									(this.state.isEditable && this.state.id === user.id) ? (
										<div key={user.id} className="grid-container">
											<div className="item">
												<input
													name="first_name"
													onChange={(e: any) => this.handleChange(e)}
													required
													type="text"
													value={this.state.first_name}
													placeholder="Enter First Name"
												/>
											</div>

											<div className="item">
												<input
													name="last_name"
													onChange={(e: any) => this.handleChange(e)}
													required
													type="text"
													value={this.state.last_name}
													placeholder="Enter Position"
												/>
											</div>

											<div className="item">
												<input
													name="position"
													onChange={(e: any) => this.handleChange(e)}
													required
													type="text"
													value={this.state.position}
													placeholder="Enter Position"
												/></div>

											<div className="item">
												<Mutation
													mutation={UPDATE_USER}
													variables={this.state}
													refetchQueries={() => [{ query: GET_USERS }]}
												>
													{updateUser => (<button disabled={!(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.position.length>0)} onClick={() => {
														updateUser();
														this.cancelUser()
													}}> Update User</button>)}
												</Mutation>
											</div>

											<div className="item">
												{<button onClick={() => this.cancelUser()}>Cancel</button>}
											</div>
										</div>
									) :

										<div key={user.id} className="grid-container">

											<div className="item" >
												<p>{user.first_name}</p>
											</div>

											<div className="item" >
												<p>{user.last_name}</p>
											</div>

											<div className="item">
												<p>{user.position}</p>
											</div>

											<div className="item">
												{<button onClick={() => this.editUser(user.id,user.first_name,user.last_name,user.position)}>Edit User</button>}
											</div>

											<div className="item">
												<Mutation
													mutation={DELETE_USER}
													variables={{ id: user.id }}
													refetchQueries={() => [{ query: GET_USERS }]}
												>
													{deleteUser => <button onClick={() => deleteUser()}>Delete User</button>}
												</Mutation>
											</div>

										</div>

								}
							</div>
						))
					);
				}
				}
			</Query >
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

const DELETE_USER = gql`
	mutation deleteUser($id: ID!) {
		deleteUser(id: $id) {
			id
		}
	}
`;

const UPDATE_USER = gql`
	mutation updateUser($id: ID!,$first_name: String!, $last_name: String!, $position: String!) {
		updateUser(id:$id,first_name: $first_name, last_name: $last_name, position: $position) {
			first_name
			last_name
			position
		}
	}
`;
