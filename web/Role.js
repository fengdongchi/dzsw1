Ext.define('Role', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'mystore',
            pageSize: 5,

            proxy: {
                type: 'ajax',
                url: '/role',
                reader: {
                    type: 'json',
                    root: 'rolelist',
                    totalProperty: 'rows'
                }
            },
            fields: [
                {name: "roleId", type: "String"},
                {name: "roleName", type: "String"},
                {name: "sortId", type: "String"},
                {name: "state", type: "String"}
            ],
            autoLoad: true
        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });


        Ext.apply(this, {
            id: 'role',
            title: '操作员管理',
            closable: true,
            store: Ext.data.StoreManager.lookup("mystore"),
            //添加到grid
            disableSelection: false,//表示可以选择行
            tbar: [
                {
                    xtype: 'button',
                    text: '添加',
                    handler: function () {
                        me.insertbutton(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '修改',
                    handler: function () {
                        me.updatebutton(me)
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '请输入所要查询的角色编号：',
                    labelWidth: 250,
                    labelAlign: 'right',
                    id: 'roleId'

                },
                {
                    xtype: 'button',
                    text: '查询',
                    handler: function () {
                        me.selectbutton(me)
                    }
                }
            ],
            columns: [

                {text: "角色编号", dataIndex: 'roleId', align: "center", flex: 1},
                {text: "角色名称", dataIndex: 'roleName', menuDisabled: true, flex: 1},
                {text: "sortID", dataIndex: 'sortId', menuDisabled: true, flex: 1},
                {text: "状态", dataIndex: 'state', menuDisabled: true, flex: 1}

            ],

            dockedItems: [
                {
                    xtype: "pagingtoolbar",
                    store: store,
                    dock: "bottom",
                    displayInfo: true
                }
            ]
        });
        this.center();
        this.callParent();
    },
    intype: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": true, "name": "启用"},
            {"abbr": false, "name": "禁用"}
        ]
    }),

    insertbutton: function (obj) {
        var me = this;

        Ext.Ajax.request({
            id: 'rolejson',
            url: "/opernametree1",
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });

        var storetree = Ext.create("Ext.data.TreeStore", {

            fields: [
                {name: "id", type: "String", mapping: "menu.menuId"},
                {name: "text", type: "String", mapping: "menu.menuName"}
            ],
            root: {
                text: 'text',
                id: '-1',
                children: me.jsonData.checknode.children
            }
        });


        Ext.create('Ext.window.Window', {
            id: 'messege',
            title: '请输入要添加的信息...',
            width: '15%',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    margin: '5 5 5 5',
                    id: 'form1',
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 70,
                        allowBlank: false
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '角色编号',
                            name: 'roleId'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '角色名称',
                            name: 'roleName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'sortID',
                            name: 'sortId'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '状态',
                            displayField: 'name',
                            valueField: 'abbr',
                            store: me.intype,
                            name: 'state'
                        }
                    ]
                },
                {
                    xtype: "treepanel",
                    border: false,
                    id: 'form2',
                    store: storetree,
                    rootVisible: false,
                    listeners: {
                        checkchange: function (checknode, checked) {
                            checknode.expand();
                            checknode.checked = checked;
                            if (true == checked) {
                                var parent_node = checknode.parentNode;
                                while (parent_node != null) {
                                    parent_node.set('checked', checked);
                                    parent_node = parent_node.parentNode;
                                }
                                checknode.eachChild(function (child) {
                                    child.set('checked', checked);
                                    child.fireEvent('checkchange', child, checked);
                                });
                            }
                            if (Ext.getCmp("form2").getRootNode().data.id == "-1") {
                                Ext.getCmp("form2").getRootNode().data.checked = false;
                            }
                        }
                    }
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确认',
                    handler: function () {
                        //添加角色方法
                        var roleInfoArray = {};
                        var formData = Ext.getCmp('form1').query();//取所有組件
                        Ext.each(formData, function (item1) {
                            if (item1) {
                                if (item1.xtype == 'combo' || item1.xtype == 'textfield') {
                                    roleInfoArray[item1.name] = item1.lastValue;
                                }
                            }
                        });
                        //遍历被选中的tree
                        var roleTree = [];
                        var checkedTree = Ext.getCmp('form2').getChecked();
                        Ext.each(checkedTree, function (item, index) {
                            if (item.data.id != '-1') {
                                roleTree[index] = {};
                                roleTree[index].menuId = item.data.id;
                            }
                        });

                        var form = Ext.create('Ext.form.Panel', {});//伪form
                        form.submit({
                            url: '/role_auth',
                            jsonSubmit: true,
                            params: {
                                role: roleInfoArray,
                                authlist: roleTree

                            },
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                if (msg.failse) {
                                    Ext.Msg.show({
                                        title: "系统提示！",
                                        msg: msg.message,
                                        buttons: Ext.Msg.YES
                                    });
                                    // Ext.getCmp("myFrom").store.reload();
                                    Ext.getCmp("role").store.reload();//对apply进行重新加载
                                } else {
                                    Ext.Msg.show({
                                        title: "系统提示！",
                                        msg: msg.message,
                                        buttons: Ext.Msg.YES
                                    });
                                }
                            },
                            failure: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText)
                                Ext.Msg.show({
                                    title: "系统提示！",
                                    msg: msg.message,
                                    buttons: Ext.Msg.YES
                                });

                            }
                        });
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        this.up('window').down('form').getForm().reset();
                    }
                }
            ]
        }).show()
    },
    updatebutton: function (obj) {
        var me = this;
        var record= Ext.getCmp("role").getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            id: 'rolejson',
            url: "/opernametree1",
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });

        var storetree1 = Ext.create("Ext.data.TreeStore", {

            fields: [
                {name: "id", type: "String", mapping: "menu.menuId"},
                {name: "text", type: "String", mapping: "menu.menuName"}
            ],
            root: {
                text: 'text',
                id: '-1',
                children: me.jsonData.checknode.children
            }
        });


        Ext.create('Ext.window.Window', {
            id: 'messege',
            title: '请输入要添加的信息...',
            width: '15%',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    margin: '5 5 5 5',
                    id: 'form3',
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 70,
                        allowBlank: false
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '角色编号',
                            value:record.get('roleId'),
                            name: 'roleId'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '角色名称',
                            value:record.get('roleName'),
                            name: 'roleName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'sortID',
                            value:record.get('sortId'),
                            name: 'sortId'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '状态',
                            displayField: 'name',
                            value:record.get('state'),
                            valueField: 'abbr',
                            store: me.intype,
                            name: 'state'
                        }
                    ]
                },
                {
                    xtype: "treepanel",
                    border: false,
                    id: 'form4',
                    store: storetree1,
                    rootVisible: false,
                    listeners: {
                        checkchange: function (checknode, checked) {
                            checknode.expand();
                            checknode.checked = checked;
                            if (true == checked) {
                                var parent_node = checknode.parentNode;
                                while (parent_node != null) {
                                    parent_node.set('checked', checked);
                                    parent_node = parent_node.parentNode;
                                }
                                checknode.eachChild(function (child) {
                                    child.set('checked', checked);
                                    child.fireEvent('checkchange', child, checked);
                                });
                            }
                            if (Ext.getCmp("form4").getRootNode().data.id == "-1") {
                                Ext.getCmp("form4").getRootNode().data.checked = false;
                            }
                        }
                    }
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确认',
                    handler: function () {
                        //添加角色方法
                        var roleInfoArray = {};
                        var formData = Ext.getCmp('form3').query();//取所有組件
                        Ext.each(formData, function (item2) {
                            if (item2) {
                                if (item2.xtype == 'combo' || item2.xtype == 'textfield') {
                                    roleInfoArray[item2.name] = item2.lastValue;
                                }
                            }
                        });
                        //遍历被选中的tree
                        var roleTree = [];
                        var checkedTree = Ext.getCmp('form4').getChecked();
                        Ext.each(checkedTree, function (item3, index) {
                            if (item3.data.id != '-1') {
                                roleTree[index] = {};
                                roleTree[index].menuId = item3.data.id;
                            }
                        });

                        var form = Ext.create('Ext.form.Panel', {});//伪form
                        form.submit({
                            url: '/role_auth_update',
                            jsonSubmit: true,
                            params: {
                                role: roleInfoArray,
                                authlist: roleTree

                            },
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                if (msg.failse) {
                                    Ext.Msg.show({
                                        title: "系统提示！",
                                        msg: msg.message,
                                        buttons: Ext.Msg.YES
                                    });
                                    // Ext.getCmp("myFrom").store.reload();
                                    Ext.getCmp("role").store.reload();//对apply进行重新加载
                                } else {
                                    Ext.Msg.show({
                                        title: "系统提示！",
                                        msg: msg.message,
                                        buttons: Ext.Msg.YES
                                    });
                                }
                            },
                            failure: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText)
                                Ext.Msg.show({
                                    title: "系统提示！",
                                    msg: msg.message,
                                    buttons: Ext.Msg.YES
                                });

                            }
                        });
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        this.up('window').down('form').getForm().reset();
                    }
                }
            ]
        }).show()
    },
    selectbutton: function (obj) {
        Ext.getCmp('role').store.load({
            params: {
                roleId: Ext.getCmp('roleId').getValue()
            }
        })
    }


});