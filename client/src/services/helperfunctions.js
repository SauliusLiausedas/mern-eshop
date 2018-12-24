import userActions from "./userActions";

export default class {

    // Verify Admin
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

    // Check if Image URL is working
    static checkImageURL(url) {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.onerror = function () {
                reject("Wrong URL");
            };
            img.onload = function () {
                resolve(url);
            };
            img.src = url;
        });
    }

    static async logout() {
        const token = localStorage.getItem('token')
        let logged = await userActions.logout(token)
        if(logged.success) {
            window.location.replace('/login')
        } else {
            return false
        }
    }

}