import firebaseConfig from "./api/fireBaseConfigs/fireBaseConfig";
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database=getFirestore(app);


export{auth,database};