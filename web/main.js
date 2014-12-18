Ext.define('main',{
    extend:'Ext.container.Viewport',
    initComponent:function(){
        var main=this;
        this.createMenuList();

        Ext.apply(this,{
            layout:'border',
            items:[
                {
                    region:'north',
                    xtype:'toolbar',
                    border:false,
                    height:80,
                    margin:'5 5 5 5',
                    items:[
                        {
                            xtype:'tbtext',
                            text:'<html><marquee scrollAmount=2  onmouseover=stop() onmouseout=start()><label style="font-size: 20px">电子商务网站后台管理系统</label></marquee><html>',
                            style:{
                                fontSize:'10pt'
                            }
                        },
                        { xtype: 'tbfill' },
                        {
                            xtype: 'button',
                            text: '退出',
                            handler:function(){
                                window.location='login.html';
                            }
                        }
                    ]
                },
                {
                    region:'west',
                    title:'菜单栏',
                    collapsible: true,
                    split: true,
                    width:150,
                    layout:'accordion',
                    items: main.menuList
                },
                {
                    region:'center',
                    title:'功能',
                    id:'myborder',
                    xtype:'tabpanel'

                },
                {
                    region: 'south',
                    xtype: 'toolbar',
                    height:10,
                    border: false

                }
            ]
        });
        this.callParent();
    },
    menuList: new Array(),
    createMenuList: function () {
        var menu = {}, tpl, main = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01" style="width: 100px;">',
            '<div class="con" style="padding-left: 20px;">',
            '<img style="width: 50px; height: 50px; float: left"  src="{src}">',
            '<div style="float: left;padding-left: 10px ">',
            '<span>{title}</span>',
            '<div class="con1">{remark}</div>',
            '</div>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: 'store.json',
            async: false,
            success: function (response) {
                menu = Ext.JSON.decode(response.responseText);
            }
        });
        for (var i = 0, l = menu.root.length; i < l; i++) {
            var storeID = 'store_' + i, item, title = menu.root[i].name;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menu.root[i].child,
                fields: [
                    {name: 'remark',type: 'string' },
                    {name: 'title', type: 'string' },
                    {name: 'src',   type: 'string' },
                    {name: 'module',type: 'string' }
                ]
            });
            item = {
                xtype: 'panel',
                title: title,
                layout: 'fit',

                items: [
                    {
                        xtype: 'dataview',
                        store: Ext.data.StoreManager.lookup(storeID),
                        tpl: tpl,
                        itemSelector: 'div.part01',
                        listeners:{
                            itemdblclick:function(view,record){
                                Ext.require(record.get('module'),function(){

                                    var center=Ext.getCmp('myborder');
                                    var tab = center.items.get("tag");
                                    if(!tab){
                                        var obj=Ext.create(record.get('module'));
                                        center.add(obj);
                                        center.setActiveTab(obj);
                                    }else{
                                        if(center.setActiveTab()!==tab){
                                            center.setActiveTab(tab);
                                        }
                                    }

                                })
                            }
                        }
                    }
                ]
            };
            main.menuList.push(item);
        }
    }
});