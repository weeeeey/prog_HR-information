const NEW_END_POINT = './src/data/new_data.json';

const req = async () => {
    try {
        const res = await fetch(NEW_END_POINT);
        return res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const getData = async () => {
    try {
        let data = JSON.parse(window.localStorage.getItem('personalInfo'));
        if (!data) {
            // const old_data = await req(OLD_END_POINT);
            data = await req();
            console.log(data);
            window.localStorage.setItem('personalInfo', JSON.stringify(data));
        }
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
