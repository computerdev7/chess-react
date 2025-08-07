export function checkUser(map, userName, id, io) {

    for (let [key, value] of map) {

        if (value[0].userName == userName) {

            value[0] = { ...value[0], id: id };
            io.to(id).emit('add', { color: 'w' })
            map.set(key, value)
            io.to(value[0].id).emit('partner', true)
            return true;

        } else if (value[1].userName == userName) {

            value[1] = { ...value[1], id: id };
            io.to(id).emit('add', { color: 'b' })
            map.set(key, value)
            io.to(value[1].id).emit('partner', true)
            return true;

        }

    }
}