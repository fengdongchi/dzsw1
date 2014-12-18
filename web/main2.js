Ext.define('main2',{
    extend:'Ext.container.Viewport',

    initComponent:function(){
        var main=this;
        var username=document.getElementById("abc").value;
        this.createMenuList();
        var store=Ext.create('Ext.data.Store',{
            proxy:{
                type:'ajax',
                url:'/viewpie',
                reader:{
                    type:'json',
                    root:'viewPieList'
                }
            },
            fields: [
                'merchandiseName',
                'num'
            ],
            autoLoad:true
        });

        Ext.Ajax.request({
            id:'rolejson',
            url:"/tree",
            async: false,
            success:function(response){
                main.jsonData = response.responseText;
                if (typeof(main.jsonData) === 'string'){
                    main.jsonData = Ext.JSON.decode(main.jsonData);
                }
            }

        });

        var storetree = Ext.create("Ext.data.TreeStore",{

            fields : [
                {name : "text",type : "String",mapping : "menu.menuName"}
            ],
            root: {
                text: username,
                id: '-1',
                children: main.jsonData.node.children
            }
        });
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
                        { xtype: 'tbfill' },{
                            xtype:'label',
                            width:100,
                            id:'clock',
                            listeners:{
                                'render':function(){
                                    main.clockGO();
                                }
                            }
                        }
                            ,
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
                    region: 'center',
                    title: '功能',
                    id: 'myborder',
                    xtype: 'tabpanel',
                    items: [{
                        title:'统计图',
                        layout : {
                            type: "table",
                            columns : 2
                        },
                        defaults: {
                           bodyStyle: 'padding:20px;'
                        },
                        items: [
                            {
                            xtype:'chart',
                            animate: true,
                            store: store,
                            width: 700,
                            height: 350,
                            theme: 'Base:gradients',
                            series: [{
                                type: 'pie',
                                angleField: 'num',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 140,
                                    height: 28,
                                    renderer: function(storeItem, item) {
                                        var total = 0;
                                        store.each(function(rec) {
                                            total += rec.get('num');
                                        });
                                        this.setTitle(storeItem.get('merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'merchandiseName',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '18px Arial'
                                }
                            }]
                        },
                            {
                            xtype:'chart',
                            width: 700,
                            height: 300,
                            animate: true,
                            theme:'Category2',
                            store: store,
                            axes: [{
                                type: 'Radial',
                                position: 'radial',
                                label: {
                                    display: true
                                }
                            }],
                            series: [{
                                type: 'radar',
                                xField: 'merchandiseName',
                                yField: 'num',
                                showInLegend: true,
                                showMarkers: true,
                                markerConfig: {
                                    radius: 5,
                                    size: 5
                                },
                                style: {
                                    'stroke-width': 2,
                                    fill: 'none'
                                }
                            }]

                        },
                            {
                            xtype:'chart',
                            width: 700,
                            height: 300,
                            animate: true,
                            theme:'Category2',
                            store: store,
                            axes: [{
                                type: 'Numeric',
                                position: 'left',
                                fields: ['num', 'num'],
                                title: '商品数量',
                                grid: true,
                                minimum: 0
                            }, {
                                type: 'Category',
                                position: 'bottom',
                                fields: ['merchandiseName'],
                                title: '商品名称'
                            }],
                            series: [{
                                type: 'scatter',
                                markerConfig: {
                                    radius: 5,
                                    size: 5
                                },
                                axis: 'left',
                                xField: 'merchandiseName',
                                yField: 'num'
                            }, {
                                type: 'scatter',
                                markerConfig: {
                                    radius: 5,
                                    size: 5
                                },
                                axis: 'left',
                                xField: 'merchandiseName',
                                yField: 'num'
                            }]
                        },
                            {
                            xtype:'chart',
                            width: 700,
                            height: 300,
                            animate: true,
                            store: store,
                            axes: [
                                {
                                    type: 'Numeric',
                                    position: 'left',
                                    fields: ['num'],
                                    label: {
                                        renderer: Ext.util.Format.numberRenderer('0,0')
                                    },
                                    title: '商品数量',
                                    grid: true,
                                    minimum: 0
                                },
                                {
                                    type: 'Category',
                                    position: 'bottom',
                                    fields: ['merchandiseName'],
                                    title: '商品名称'
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    axis: 'left',
                                    highlight: true,
                                    tips: {
                                        trackMouse: true,
                                        width: 140,
                                        height: 28,
                                        renderer: function(storeItem, item) {
                                            this.setTitle(storeItem.get('merchandiseName') + ': ' + storeItem.get('num') + ' $');
                                        }
                                    },
                                    label: {
                                        display: 'insideEnd',
                                        'text-anchor': 'middle',
                                        field: 'num',
                                        renderer: Ext.util.Format.numberRenderer('0'),
                                        orientation: 'vertical',
                                        color: '#333'
                                    },
                                    xField: 'merchandiseName',
                                    yField: 'num'
                                }
                            ]
                        }
                        ]
                    }
                    ]

                },
                {
                    region:'east',
                    id:'tree',
                    title:'操作员权限树',
                    collapsible: true,
                    split: true,
                    width:'10%',
                    height:'100%',
                    items:[{
                        xtype : "treepanel",
                        border:false,
                        store: storetree,
                        rootVisible: true
                    }]
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
    clockGO:function(){
        Ext.TaskManager.start({
            run:function(){
                Ext.getCmp('clock').setText(Ext.Date.format(new Date(),'g:i:s A'));
            },
            interval:1000
        });
    },
    menuList: new Array(),
    createMenuList: function () {
        var menus = {}, tpl, main = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01" style="width: 100px;">',
            '<div class="con" style="padding-left: 20px;">',
            '<img style="width: 50px; height: 50px; float: left"  src="{src}">',
            '<div style="float: left;padding-left: 10px ">',
            '<span>{titlename}</span>',
            '</div>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: '/tree',
            async: false,
            success: function (response) {
                menus = Ext.JSON.decode(response.responseText);
            }
        });
        for (var i = 0, l = menus.node.children.length; i < l; i++) {
            var storeID = 'store_' + i, item, title = menus.node.children[i].menu.menuName;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menus.node.children[i].children,
                fields: [
                    {name: 'titlename',type: 'string',mapping : "menu.menuName"},//如果调用树的数据，需要用映射来调出数据mapping：""
                    {name: 'tag', type: 'string',mapping : "menu.tag"},
                    {name: 'src',   type: 'string',mapping : "menu.src" },
                    {name: 'module',type: 'string',mapping : "menu.module"}
                ]
            });
            item = {
                xtype: 'panel',
                title: title,
                layout: 'fit',
                icon:'',

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