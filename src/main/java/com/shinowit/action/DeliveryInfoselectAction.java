package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class DeliveryInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TBaDeliveryInfo> deliverylist;
    private String deliveryId;
    @Resource
    public BaseDAO<TBaDeliveryInfo> dao;

    public String select(){

        if(deliveryId!=null){
            deliverylist=dao.queryForPage("from TBaDeliveryInfo a where a.deliveryId like \'%" + deliveryId + "%\'", page, limit);
            rows=deliverylist.size();
            return SUCCESS;
        }
        deliverylist=dao.queryForPage("from TBaDeliveryInfo",page,limit);
        rows=dao.queryRecordCount("select count(*) from TBaDeliveryInfo");
        return SUCCESS;
    }

    public String getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(String deliveryId) {
        this.deliveryId = deliveryId;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TBaDeliveryInfo> getDeliverylist() {
        return deliverylist;
    }

    public void setDeliverylist(List<TBaDeliveryInfo> deliverylist) {
        this.deliverylist = deliverylist;
    }
}
