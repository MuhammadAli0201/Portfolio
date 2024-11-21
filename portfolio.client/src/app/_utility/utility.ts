export class Utility {
    static listRandom(_list: any[]) {
        let i = Math.floor(Math.random() * _list.length);
        return _list[i];
    }
}