//合併所有reducer並返回
import { combineReducers } from 'redux'
import { box } from './redux/box.redux'
import { playlist } from './redux/playlist.redux'
import { playlist_category } from './redux/playlist_category.redux'
import { hot_board } from './redux/hotBoard.redux'
import { category } from './redux/category.redux';
import { setting } from './redux/setting.redux'
import { category_box } from './redux/category_box.redux'
export default combineReducers({ box, playlist, playlist_category, hot_board, category, setting, category_box })