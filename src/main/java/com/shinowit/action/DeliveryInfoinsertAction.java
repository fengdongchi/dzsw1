package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class DeliveryInfoinsertAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TBaDeliveryInfo deli;
    private List<TBaDeliveryInfo> list;
    @Resource
    private BaseDAO<TBaDeliveryInfo> dao;

    public String insert(){
        list=dao.listAll(TBaDeliveryInfo.class);
        for(TBaDeliveryInfo u:list){
            if(u.getDeliveryName().trim().equals(deli.getDeliveryName().trim())){
                setSuccess(true);
                setFailse(false);
                setMessage("您插入失败！");
                return SUCCESS;
            }
        }
        setMessage("插入成功！");
        setFailse(true);
        setSuccess(true);
        dao.insert(deli);
        return SUCCESS;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public TBaDeliveryInfo getDeli() {
        return deli;
    }

    public void setDeli(TBaDeliveryInfo deli) {
        this.deli = deli;
    }

    public List<TBaDeliveryInfo> getList() {
        return list;
    }

    public void setList(List<TBaDeliveryInfo> list) {
        this.list = list;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
