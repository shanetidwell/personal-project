import React from 'react';
import {Switch, Route} from 'react-router-dom';

// import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Request from './components/Request/Request';
import ShopAndDeliver from './components/ShopAndDeliver/ShopAndDeliver';
import AddItem from './components/AddItem/AddItem';
import MyGiftRequests from './components/MyGiftRequests/MyGiftRequests';
import MyDeliveries from './components/MyDeliveries/MyDeliveries';
import UserReviews from './components/UserReviews/UserReviews';
import Messaging from './components/Messaging/Messaging';
import MessageThreads from './components/MessageThreads/MessageThreads';


export default (
    <Switch>
        <Route exact path = '/' component={Login}/>
        <Route path = '/home' component={Home}/>
        <Route path = '/request' component={Request}/>
        <Route path = '/shopanddeliver' component={ShopAndDeliver}/>
        <Route path = '/myGiftRequests' component={MyGiftRequests}/>
        <Route path ='/myDeliveries' component={MyDeliveries}/>
        <Route path = '/userReviews/:id' component={UserReviews}/>
        <Route path = '/messages/:threadId' component={Messaging}/>
        <Route path = "/messageThreads" component={MessageThreads}/>


    </Switch>
)