import userActions from "./userActions";

export default class {

    // Verify Admin
    static async verification() {
        const token = localStorage.getItem('token');
        let authorized = await userActions.userVerify(token);
        console.log(authorized);
        if (authorized && authorized.success) {
            return true
        } else {
            window.alert('Privalote prisijungti, jei norite čia būti');
            window.location.replace('/prisijungti');
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


    // Logout
    static async logout() {
        const token = localStorage.getItem('token');
        localStorage.removeItem("token");
        let logged = await userActions.logout(token);
        if(logged.success) {
            window.location.replace('/prisijungti')
        } else {
            return false
        }
    }
    
    // Add class on state === true

    static addClass(state, className) {
        if(state) {
            return `${className}`
        } else {
            return ''
        }
    }

    // Clone array

    static arrayClone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }


}