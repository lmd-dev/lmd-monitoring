interface IWebsite
{
    id: number;
    name: string;
    url: string;
    expectedStatusCode: number;
    checkSSL: boolean;
}