import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { ProductNavigator, OrdersNavigator } from './ShopNavigation';

const RootDrawerNavigation = createDrawerNavigator({
  Products: {
    screen: ProductNavigator,
  },
  Orders: {
    screen: OrdersNavigator,
  },
});

export default createAppContainer(RootDrawerNavigation);
