export class Services {
    private static Host = /*'http://localhost:51555'*/'http://robustmobileapp.azurewebsites.net';
    public static MenuUrl = `${Services.Host}/api/menu`;
    public static PostsUrl = `${Services.Host}/api/blogpost`;
    public static PagesUrl = `${Services.Host}/api/page`;
    public static FormUrl = `${Services.Host}/api/form`;

    //header needed for the mobile app services api
    public static Config = {
        headers: {
            'ZUMO-API-VERSION': '2.0.0'
        }
    }
}

