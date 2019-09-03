import React,{Component} from 'react';

import  {
    NetInfo,
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    TextInput,
    ListView,
    View,
    Alert,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {setSpText} from '../../utils/ScreenUtil'
import Config from "../../../config";
import PreferenceStore from "../../utils/PreferenceStore";
import {SwipeRow} from "react-native-swipe-list-view";
import ModalDropdown from 'react-native-modal-dropdown';
import VentasDetail from '../../containers/Stock/VentasDetail'
import CompanyInfo from '../../containers/Stock/CompanyInfo';
var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');
var proxy = require('../../proxy/Proxy');

class VentasInfoModal extends Component{

    cancel() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    navigatorVentasDetail(ventasInfo) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'VentasDetail',
                component: VentasDetail,
                params: {
                    ventasInfo: ventasInfo,
                }
            })
        }
    }

    navigatorCompanyInfo(ventasInfo) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'CompanyInfo',
                component: CompanyInfo,
                params: {
                    ventasInfo: ventasInfo,
                    username: this.props.username,
                    sessionId: this.props.sessionId,
                    password: this.props.password,
                }
            })
        }
    }

    renderRow(rowData){

        var pictureurl = rowData.pictureurl;

        if(pictureurl!=null && pictureurl!=undefined && pictureurl!=''){
            var row =
                <SwipeRow
                    style={{marginTop:5}}
                    preview={true}
                    rightOpenValue={-60}>
                    <View style={{
                        alignItems: 'center',
                        flex:1,
                        height:120,
                        flexDirection: "row-reverse"
                    }}>
                        <TouchableOpacity
                            style={{width:60,paddingHorizontal: 10,backgroundColor: "#fc6254",textAlign:'center',justifyContent:'center'}}
                            onPress={() => {
                                this.navigatorVentasDetail(rowData)
                            }}>

                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color: '#fff', textAlign: 'center',fontSize:setSpText(20)}}>详</Text></View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color: '#fff', textAlign: 'center',fontSize:setSpText(20)}}>情</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        height:120,
                        borderBottomWidth: 1,
                        borderColor: '#ddd',
                        padding:10,
                        backgroundColor:'#fff'
                    }}>
                        <TouchableOpacity
                            style={{flex:1,flexDirection:row}}
                            onPress={() => {
                                this.navigatorCompanyInfo(rowData)
                            }}
                        >
                            <View style={{flex:1, flexDirection: 'row'}}>
                                <Image resizeMode="contain"
                                       style={styles.pic_style}
                                       source={{uri: pictureurl}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SwipeRow>

            return row;
        }
        else{
            var row =
                <SwipeRow
                    style={{marginTop:5}}
                    preview={true}
                    rightOpenValue={-60}>
                    <View style={{
                        alignItems: 'center',
                        flex:1,
                        height:120,
                        flexDirection: "row-reverse"
                    }}>
                        <TouchableOpacity
                            style={{width:60,paddingHorizontal: 10,backgroundColor: "#fc6254",textAlign:'center',justifyContent:'center'}}
                            onPress={() => {
                                this.navigatorVentasDetail(rowData)
                            }}>

                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color: '#fff', textAlign: 'center',fontSize:setSpText(20)}}>详</Text></View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color: '#fff', textAlign: 'center',fontSize:setSpText(20)}}>情</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        borderBottomWidth: 1,
                        borderColor: '#ddd',
                        padding:10,
                        height:120,
                        backgroundColor:'#fff'
                    }}>
                        <TouchableOpacity
                            style={{flex:1}}
                            onPress={() => {
                                this.navigatorCompanyInfo(rowData)
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.renderText}> {rowData.nombre}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SwipeRow>

            return row;
        }
    }

    constructor(props)
    {
        super(props);
        this.state={
            ventasInfoList:[]
        }
    }

    render(){

        var listView = null;
        const ventasInfoList = this.state.ventasInfoList;
        if (ventasInfoList !== undefined && ventasInfoList !== null) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            listView =
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(ventasInfoList)}
                    renderRow={this.renderRow.bind(this)}
                />
        } else {
            this.state.ventasInfoList = [];
        }

        return (
            <View style={{flex:1,backgroundColor:'#f0f0f0'}}>

                {/*header*/}
                <View style={[{backgroundColor:'#387ef5',padding:4,paddingTop:Platform.OS=='ios'?40:15,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <View style={{flex:1,paddingLeft:10}}>
                        <TouchableOpacity
                            style={{flexDirection:'row',height:40,alignItems:'flex-end'}}
                            onPress={
                                ()=>{
                                    this.cancel();
                                }
                            }>
                            <Icon name="arrow-left" size={20} color="#fff" />
                            <Text style={{fontSize:setSpText(17),flex:5,textAlign:'center',color:'#fff'}}>
                                跳过首页
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:setSpText(17),flex:3,textAlign:'center',color:'#fff'}}>
                        已登录的供应商
                    </Text>
                    <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center'}}>
                    </View>
                </View>

                {/*条型码列表*/}
                <View style={{padding:10,marginBottom: 60}}>
                    {listView}
                </View>
                {/*等待提示*/}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.showProgress}
                    onRequestClose={() => {
                        this.setState({showProgress: false})
                    }}
                >
                    <View style={[styles.modalContainer, styles.modalBackgroundStyle, {paddingTop: height / 2 - 30,}]}>
                        <ActivityIndicator
                            animating={true}
                            style={[styles.loader, {height: 80}]}
                            size="large"
                            color="#AAAAAA"
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: '#AAAAAA', fontSize: setSpText(18), alignItems: 'center'}}>
                                请求中...
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    componentWillMount() {
        this.fetchData_ventas();
    }

    fetchData_ventas() {
        let sessionId = this.props.sessionId;
        let password = this.props.password;
        let username = this.props.username;
        this.setState({ventasInfoList: null});

        this.setState({showProgress:true})


        proxy.postes_ventas({
            url: Config.server2 + "/func/auth/loginAfterOtherServerAuthed",
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                loginName: username,
                password: password,
                motherServerSessionId: sessionId,
            }
        }).then((json) => {
            if(json.re==1) {
                proxy.postes_ventas({
                    url: Config.server2 + "/func/sale/getAllVentasInfoForm",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                    }
                }).then((json) => {//listCommodity是查询出的商品列表listVentas是查询出的商户列表
                    if(json.re==1){
                        var json = json.data;
                        var errorMsg = json.message;
                        this.setState({showProgress: false});
                        if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {

                            setTimeout(()=>{
                                Alert.alert(
                                    '提示',
                                    "没有数据",
                                    [
                                        {
                                            text: 'OK', onPress: () => {

                                            }
                                        }
                                    ]
                                )
                            },1000)

                        } else {
                            if (json.listVentas !== undefined && json.listVentas !== null) {
                                if (json.listVentas === []) {
                                    setTimeout(()=> {
                                        alert("no data");
                                    },1000)
                                    return;
                                }
                                this.setState({ventasInfoList: json.listVentas, showProgress: false});
                            }
                            else {
                                this.setState({showProgress: false});
                            }
                        }
                    }
                }).catch((err) => {
                    alert(err);
                })
            }else{
                this.setState({showProgress: false});
            }
        }).catch((err) => {
            alert(err);
        });
    }
}


var styles = StyleSheet.create({
    card: {
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    table: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#343434',
        //marginBottom: 10,
        marginRight: 10,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    renderText: {
        fontSize: setSpText(18),
        alignItems: 'center'
    },

    box: {
        position: 'absolute',
        right: 1 / 2 * width - 100,
        top: 1 / 2 * height - 100,
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#387ef5',
        backgroundColor: 'transparent'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    dropdown: {
        flex: 1,
        paddingRight: 10,
        backgroundColor: 'transparent',
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    dropdown_dropdownTextStyle: {
        width: 200,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: '#387ef5'
    },
    dropdown_3_dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
        color: '#000'
    },
    pic_style: {
        flex:1,
        height: 100,
    },
});

module.exports = connect(state => ({
        merchantId: state.user.supnuevoMerchantId,
        username: state.user.username,
        commodityClassList: state.sale.commodityClassList,
        weightService: state.sale.weightService,
        sessionId: state.user.sessionId,
        password: state.user.password,
        isConnected:state.netInfo.isConnected,
    })
)(VentasInfoModal);
