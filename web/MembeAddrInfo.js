Ext.define('MembeAddrInfo',{
    extend:'Ext.grid.Panel',
    states: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {abbr:"true", name:"是"},
            {abbr:"false", name:"否"}
        ]
    }),
    member:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/TBaMemberInfo',
            reader:{
                type:'json',
                root:'memberlist'
            }
        },fields:[
            {
                name:'id',
                type:'String'
            },{
                name:'userName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    initComponent:function(){
        var me=this;
        var store=Ext.create('Ext.data.Store',{
            id:'store1',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'/TBaMembeAddrInfo',
                reader:{
                    type:'json',
                    root:'memaddlist',
                    totalProperty:'rows'
                }
            },
            fields:[
                {name:'id',type:'String'},
                {name:'recMan',type:'String'},
                {name:'tel',type:'String'},
                {name:'recAddress',type:'String'},
                {name:'postCode',type:'String'},
                {name:'isDefault',type:'Boolean'},
                {name:'TBaMemberInfoByUserName.userName',type:'String'}
            ],
            autoLoad:true
        });
        store.load({
            params:{
                start:0,
                limit:5
            }
        });
        Ext.apply(this,{
            id:'MembeAddr',
            title:'会员收货地址信息',
            closable:true,
            store:Ext.data.StoreManager.lookup("store1"),
            tbar:[
                {
                    text:'添加',
                    xtype:'button',
                    handler:function(){me.insertbutton(me)}
                },{
                    text:'删除',
                    xtype:'button',
                    handler:function(){me.deletebutton(me)}
                },{
                    text:'修改',
                    xtype:'button',
                    handler:function(){me.updatebutton(me)}
                },{
                    labelField:'所要查询会员地址编码',
                    xtype:'textfield',
                    id:'deliveryId'
                },{
                    text:'查询',
                    xtype:'button',
                    handler:function(){me.selectbutton(me)}

                }
            ],
            columns:[
                {text:'编号',dataIndex:'id',flex : 1},
                {text:'收货人姓名',dataIndex:'recMan',flex : 1},
                {text:'电话',dataIndex:'tel',flex : 1},
                {text:'货物的配送地址',dataIndex:'recAddress',flex : 1},
                {text:'邮编',dataIndex:'postCode',flex : 1},
                {text:'是否默认',dataIndex:'isDefault',flex : 1},
                {text:'用户名',dataIndex:'TBaMemberInfoByUserName.userName',flex : 1}
            ],
            dockedItems: [
                {
                    xtype: "pagingtoolbar",
                    store: store,
                    dock: "bottom",
                    displayInfo: true
                }
            ]
        }),
        this.callParent();

    },
    insertbutton: function(obj){
        var me=this;
        Ext.create('Ext.window.Window',{
            id:'messege',
            title:'请输入要添加的信息...',
            width:300,
            height:300,
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                defaults:{
                    labelAlign:'right',
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'编号',
                        name:'memadd.id'
                    },{
                        xtype:'textfield',
                        fieldLabel:'收货人姓名',
                        name:'memadd.recMan'
                    },{
                        xtype:'textfield',
                        fieldLabel:'电话',
                        name:'memadd.tel'
                    },{
                        xtype:'textfield',
                        fieldLabel:'货物的配送地址',
                        name:'memadd.recAddress'

                    },{
                        xtype:'textfield',
                        fieldLabel:'邮编',
                        name:'memadd.postCode'

                    },{
                        xtype:'combo',
                        fieldLabel:'用户名',
                        store:me.member,
                        editable:false,
                        displayField:'id',
                        valueField:'userName',
                        name:'memadd.TBaMemberInfoByUserName.userName'

                    },{
                        xtype:'combo',
                        fieldLabel:'是否默认',
                        name:'memadd.isDefault',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr'
                    }
                ],
                buttonAlign:'center',
                buttons:[{
                    text:'确认',
                    handler:obj.doinsert
                },{
                    text:'重置',
                    handler:function(){this.up('window').down('form').getForm().reset();}
                }]
            }]
        }).show()
    },
    doinsert:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url : '/insertaction9',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("MembeAddr").store.reload();
                        Ext.getCmp("messege").close();
                    }
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES

                    })
                    //Ext.getCmp("MembeAddr")
                },
                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("messege").close();
                }

            })
        }

    },
    deletebutton: function(obj){
        var record= Ext.getCmp("MembeAddr").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要删除的会员收货地址编号...',
            id:'ldy',
            width:300,
            height:130,
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                defaults:{
                    labelAlign:'right',
                    labelWidth:90,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'编号',
                        name:'memadd.id',
                        value:record.get('id')
                    }],
                buttonAlign:'center',
                buttons:[{
                    text:'确认',
                    handler:obj.dodelete
                },{
                    text:'重置',
                    handler:function(){this.up('window').down('form').getForm().reset();}
                }]
            }]
        }).show()
    },
    dodelete:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/deleteaction9',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse){
                        Ext.Msg.show({
                            title:"系统提示！",
                            msg:msg.message,
                            buttons:Ext.Msg.YES
                        });
                        Ext.getCmp("MembeAddr").store.reload();
                        Ext.getCmp("ldy").close();
                    }

                },
                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title:"系统提示！",
                        msg:msg.message,
                        buttons:Ext.Msg.YES
                    });
                    Ext.getCmp("ldy").close();
                }
            })
        }

    },
    updatebutton: function(obj){
        var me=this;
        var record= Ext.getCmp("MembeAddr").getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window',{
            title:'请输入要修改的信息...',
            id:'ldy1',
            width:300,
            height:300,
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                margin:'5 5 5 5',
                defaults:{
                    labelAlign:'right',
                    labelWidth:70,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'编号',
                        name:'memadd.id',
                        value:record.get('id')
                    },{
                        xtype:'textfield',
                        fieldLabel:'收货人姓名',
                        name:'memadd.recMan',
                        value:record.get('recMan')
                    },{
                        xtype:'textfield',
                        fieldLabel:'电话',
                        name:'memadd.tel',
                        value:record.get('tel')
                    },{
                        xtype:'textfield',
                        fieldLabel:'货物的配送地址',
                        name:'memadd.recAddress',
                        value:record.get('recAddress')

                    },{
                        xtype:'textfield',
                        fieldLabel:'邮编',
                        name:'memadd.postCode',
                        value:record.get('postCode')

                    },{
                        xtype:'textfield',
                        fieldLabel:'用户名',
                        readOnly:true,
                        name:'memadd.TBaMemberInfoByUserName.userName',
                        value:record.get('TBaMemberInfoByUserName.userName')

                    },{
                        xtype:'combo',
                        fieldLabel:'是否默认',
                        name:'memadd.isDefault',
                        editable:false,
                        store: me.states,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        value:record.get('isDefault')
                    }
                ],
                buttonAlign:'center',
                buttons:[{
                    text:'确认',
                    handler:obj.doupdate
                },{
                    text:'重置',
                    handler:function(){this.up('window').down('form').getForm().reset();}
                }]
            }]
        }).show()
    },
    doupdate:function(){
        var form=this.up('window').down('form').getForm();
        if(form.isValid){
            form.submit({
                url:'/updateaction9',
                success:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    if(msg.failse) {
                        Ext.MessageBox.show({
                            title: "系统提示！",
                            msg: msg.message,
                            buttons: Ext.Msg.YES
                        });
                        Ext.getCmp("MembeAddr").store.reload();
                        Ext.getCmp("ldy1").close();
                    }
                },

                failure:function(form,action){
                    var msg=Ext.JSON.decode(action.response.responseText)
                    Ext.MessageBox.show({
                        title:"系统提示！",
                        msg:msg.message,
                        button:Ext.Msg.YES
                    })
                    Ext.getCmp("ldy1").close();
                }
            })
        }
    },
    selectbutton: function(obj){
        Ext.getCmp('MembeAddr').store.load({
            params:{
                id:Ext.getCmp('id').getValue()
            }
        })
    }

})