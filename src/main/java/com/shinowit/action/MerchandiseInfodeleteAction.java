package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerchandiseInfodeleteAction extends ActionSupport{
    private boolean success;
    private String message;
    private boolean failse;
    private List<TMeMerchandiseInfo> chanlist;
    private TMeMerchandiseInfo chan;
    @Resource
    private BaseDAO<TMeMerchandiseInfo> dao;

    public String delete(){
        dao.delete(chan);
        setSuccess(true);
        setFailse(true);
        setMessage("删除成功！");
        return SUCCESS;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public List<TMeMerchandiseInfo> getChanlist() {
        return chanlist;
    }

    public void setChanlist(List<TMeMerchandiseInfo> chanlist) {
        this.chanlist = chanlist;
    }

    public TMeMerchandiseInfo getChan() {
        return chan;
    }

    public void setChan(TMeMerchandiseInfo chan) {
        this.chan = chan;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
