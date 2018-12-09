import userActions from "./userActions";

export default class {

    static async verification() {
        const token = localStorage.getItem('token');
        let authorized = await userActions.userVerify(token);
        if (authorized && authorized.success) {
            return true
        } else {
            window.alert('Privalote prisijungti, jei norite čia būti');
            window.location.replace('/login');
            return false
        }
    }
}