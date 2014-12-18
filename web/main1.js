Ext.define('main1',{
    extend:'Ext.panel.Panel',
    initComponent:function(){
        Ext.apply(this,{
            bodyStyle:'background:initial',
            width : 565,
            height : 550,
            border:false,
            items:[
                {
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px;padding-left: 0; background-image: url(images/6_01.gif)"></div>',
                    margin:'50 15 25 50',
                    style:{
                        padding:'0 0 0 0',
                        height: '80px',
                        width: '120px'

                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_02.gif)"></div>',
                    margin:'50 15 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                        }
                    },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_03.gif)"></div>',
                    margin:'50 50 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_04.gif)"></div>',
                    margin:'25 15 25 50',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_05.gif)"></div>',
                    margin:'25 15 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_06.gif)"></div>',
                    margin:'25 25 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_07.gif)"></div>',
                    margin:'25 15 25 50',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_08.gif)"></div>',
                    margin:'25 15 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                },{
                    xtype:'button',
                    html:'<div style="width:120px;height: 80px; background-image: url(images/6_09.gif)"></div>',
                    margin:'25 25 25 15',
                    style: {
                        padding: '0 0 0 0',
                        height: '80px',
                        width: '120px'
                    }
                }
            ]
        });

        this.callParent();
    }

})