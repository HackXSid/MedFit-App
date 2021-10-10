export const getChatData = (name) => {
    return [
        {
            _id: 6,
            text: `Let's start with finding the type of doctor you need`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
            quickReplies: {
                type: 'radio',
                values: [
                    {
                        title: "Let's Start",
                        value: 'start_med_op',
                    },
                ],
            },
        },
        {
            _id: 5,
            text: `I'll send reminders about your medications or any upcoming appointments`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
        },
        {
            _id: 1,
            text: `3. Appointment Reminders`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
        },
        {
            _id: 2,
            text: `2. Periodic Medication Reminder`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
        },
        {
            _id: 3,
            text: `1. Choosing the right type of doctor based on your symptoms`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
        },
        {
            _id: 4,
            text: `Hi ${name}, I'm MedBuddy, your personal assistant. I'll help you in`,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'MedBuddy',
                avatar: require('../assets/doctor_avatar/avatar1.png'),
            },
        },
    ];
};
