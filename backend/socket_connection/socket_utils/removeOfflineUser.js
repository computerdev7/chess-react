export function removeOffline(users, io, arr) {

    setInterval(() => {

        if (users.size != 0) {
            for (let [key, value] of users) {

                let date = new Date()

                if (date - value[0]?.time > 10000) {
                    io.to(value[1].id).emit('nopartner', true)
                    users.delete(key)
                } else if (date - value[1]?.time > 10000) {
                    io.to(value[0].id).emit('nopartner', true)
                    users.delete(key)
                } else if (value[0]?.time == undefined) {
                    value[0].time = date.getTime()
                } else if (value[1]?.time == undefined) {
                    value[1].time = date.getTime()
                }

            }
        }

    }, 10000)

}