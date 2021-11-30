// import React , {useEffect,useState} from 'react';
// import {GetIndex} from "@/services/index/getindexdata";
// import { Line } from '@antv/g2plot';
//
// const Index = () => {
//   const [usersCount,setUserCount] = useState(undefined);
//   const [goodsCount,setGoodsCount] = useState(undefined);
//   const [orderCount,setOrderCount] = useState(undefined);
//   // @ts-ignore
//   useEffect( () => {
//     GetIndex().then((res)=>{
//       setUserCount(res.user_count)
//       setGoodsCount(res.goods_count)
//       setOrderCount(res.order_count)
//     })
//   },[])
//   const data = [
//     {name:'用户数量',value:usersCount},
//     {name:'商品数量',value:goodsCount},
//     {name:'订单数量',value:orderCount},
//   ];
//
//   return (
//     <div id="container">
//
//     </div>
//   );
// };
//
// export default Index;

import React, {Component} from 'react';
import {GetIndex} from "@/services/index/getindexdata";
import { Chart } from '@antv/g2';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      usersCount:'',
      goodsCount:'',
      orderCount:''
    }
  }

  componentDidMount() {
    GetIndex().then((res)=>{
      this.setState({
        usersCount:res.users_count,
        goodsCount:res.goods_count,
        orderCount:res.order_count,
      })
    })
  }



  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Index;
