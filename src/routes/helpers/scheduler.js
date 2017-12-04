var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');
var schedule = require('node-schedule');

function meetingNotify(meeting, desc)
{
	for(var i = 0; i < meeting.invited.length; i++)
	{
		var notification = new Notification({
			status: 1,
			type: 'MISC',
			fromId: meeting.invited[i],
			toId: meeting.user,
			meeting : meeting,
			date: new Date(),
			description: 'Meeting: "' + meeting.name + ' ' + desc
		});
		notification.save(function(error){
			if(!!error)
			{
				//uh
			}
		});
	}
}

module.exports = {

	startMeeting:function(meeting) 
	{
		//When the meeting date is met, update status and notify
		meeting.status = 2; //in progress
		meeting.save(function(error){
			if(!error)
			{
				meetingNotify(meeting, 'is in progress');
			}
		});
	},

	endMeeting:function(meeting) {
		//When the meeting date is met, update status and notify
		meeting.status = 3; //Completed
		meeting.save(function(error){
			if(!error)
			{
				meetingNotify(meeting, 'has ended.');
			}
		});
	},

    scheduleStartMeeting:function(meeting, date) {
    	var t = new Date(2017, 11, 5, 1, 14, 0);
    	var j = schedule.scheduleJob({startDate : date }, function(){


				//When the meeting date is met, update status and notify
			meeting.status = 2; //in progress
			meeting.save(function(error){
				if(!error)
				{
					for(var i = 0; i < meeting.invited.length; i++)
					{
						var notification = new Notification({
							status: 1,
							type: 'MISC',
							fromId: meeting.invited[i],
							toId: meeting.user,
							meeting : meeting,
							date: new Date(),
							description: 'Meeting: "' + meeting.name + ' ' + 'is in progress'
						});
						notification.save(function(error){});
					}
					//run once
					j.cancel();
				}
			});
    	});
    },

    scheduleEndMeeting:function(meeting, date) {
    	schedule.scheduleJob(date, this.startMeeting(meeting));
    }
};