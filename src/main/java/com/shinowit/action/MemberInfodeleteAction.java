package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/1.
 */
public class MemberInfodeleteAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TBaMemberInfo mem;
    @Resource
    private BaseDAO<TBaMemberInfo> dao;
    public String delete(){
        dao.delete(mem);
        setFailse(true);
        setSuccess(true);
        setMessage("删除成功");
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TBaMemberInfo getMem() {
        return mem;
    }

    public void setMem(TBaMemberInfo mem) {
        this.mem = mem;
    }
}
