import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {MyFooQueryLang} from "./dummyql";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const dummyql = (req.query.q || (req.body && req.body.q));
         let result: string | string[] = [];
        try  {
            result = MyFooQueryLang.query.tryParse(dummyql);
        } catch (err) {
            result = err.message
        }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };

};

export default httpTrigger;
