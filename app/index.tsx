import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from './screens/login';

export default function Index() {
  return (
    <SafeAreaView className='flex-1'>
      <LoginScreen></LoginScreen>  
    </SafeAreaView>
  );
}
