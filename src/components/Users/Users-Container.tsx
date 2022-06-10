import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers } from '../../redux/users-reducer';
import Users from "./Users";
import Loader from '../common/Loader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getPortionSize, getResectUsers, getTotalUsersCount } from '../../redux/users-selector';
import { UserType } from '../../types/Types';
import { GlobalStateType } from '../../redux/redux-store';

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isLoading: boolean
    followingInProgress: Array<number>
    portionSize: number
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void

}
type OwnPropsType = {

}
type PropsType = mapStateToPropsType & mapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }


    onPageChanged = (pageNumber: number) => {

        this.props.getUsers(pageNumber, this.props.pageSize);

    }


    render() {
        return <div>
            {this.props.isLoading ? <Loader /> : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
            />
        </div>
    }
}
/*
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress
    }
}*/
let mapStateToProps = (state: GlobalStateType): mapStateToPropsType => {
    return {
        users: getResectUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}


export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, {
        follow, unfollow, getUsers
    })
)(UsersContainer)

